import { promises as fs } from "node:fs";
import path from "node:path";
import { StatusCodes } from "http-status-codes";
import type IUser from "../../src/interfaces/IUser";
import UserService from "../../src/services/userService";
import ApiErrors from "../../src/utils/apiErros";

jest.mock("fs", () => ({
	promises: {
		readFile: jest.fn(),
		writeFile: jest.fn(),
	},
}));

describe("UserService", () => {
	const mockUsers: IUser[] = [
		{ id: 1, name: "John Doe", email: "john@example.com" },
		{ id: 2, name: "Jane Doe", email: "jane@example.com" },
	];

	let userService: UserService;

	beforeEach(() => {
		userService = new UserService();
		(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockUsers));
		(fs.writeFile as jest.Mock).mockResolvedValue(undefined);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getAllUsers", () => {
		it("should return all users", async () => {
			const users = await userService.getAllUsers();
			expect(users).toEqual(mockUsers);
		});
	});

	describe("getUserById", () => {
		it("should return a user by id", async () => {
			const user = await userService.getUserById(1);
			expect(user).toEqual(mockUsers[0]);
		});

		it("should throw an error if user is not found", async () => {
			await expect(userService.getUserById(999)).rejects.toThrow(ApiErrors);
			await expect(userService.getUserById(999)).rejects.toThrow(
				"Usuáro não encontrado",
			);
			await expect(userService.getUserById(999)).rejects.toHaveProperty(
				"statusCode",
				StatusCodes.NOT_FOUND,
			);
		});
	});

	describe("createUser", () => {
		it("should create a new user", async () => {
			const newUser: IUser = { id: 0, name: "Bob", email: "bob@example.com" };
			const createdUser = await userService.createUser(newUser);

			expect(createdUser).toEqual({ id: 3, ...newUser });
		});

		it("should throw an error if email already exists", async () => {
			const existingUser: IUser = {
				id: 0,
				name: "John Doe",
				email: "john@example.com",
			};

			await expect(userService.createUser(existingUser)).rejects.toThrow(
				ApiErrors,
			);
			await expect(userService.createUser(existingUser)).rejects.toThrow(
				"Email já registrado.",
			);
		});
	});

	describe("updateUser", () => {
		it("should update an existing user", async () => {
			const updatedData: Partial<IUser> = { name: "John Updated" };
			const updatedUser = await userService.updateUser(1, updatedData);

			expect(updatedUser).toEqual({ ...mockUsers[0], ...updatedData });
		});

		it("should throw an error if user is not found", async () => {
			await expect(
				userService.updateUser(999, { name: "Not Found" }),
			).rejects.toThrow(ApiErrors);
			await expect(
				userService.updateUser(999, { name: "Not Found" }),
			).rejects.toThrow("Usuáro não encontrado");
		});
	});

	describe("deleteUser", () => {
		it("should delete a user by id", async () => {
			const result = await userService.deleteUser(1);

			expect(result).toBe(true);
		});

		it("should return false if user is not found", async () => {
			await expect(userService.deleteUser(999)).rejects.toThrow(ApiErrors);
			await expect(userService.deleteUser(999)).rejects.toThrow(
				"Usuáro não encontrado",
			);
		});
	});
});
