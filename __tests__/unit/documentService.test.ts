import { promises as fs } from "node:fs";
import path from "node:path";
import { StatusCodes } from "http-status-codes";
import type IDocument from "../../src/interfaces/IDocument";
import DocumentService from "../../src/services/documentService";
import UserService from "../../src/services/userService";
import ApiErrors from "../../src/utils/apiErros";

jest.mock("fs", () => ({
	promises: {
		readFile: jest.fn(),
		writeFile: jest.fn(),
	},
}));

jest.mock("../../src/services/userService");

describe("DocumentService", () => {
	const mockDocuments: IDocument[] = [
		{ id: 1, name: "Doc 1", status: "active", userId: 1 },
		{ id: 2, name: "Doc 2", status: "inactive", userId: 2 },
	];

	let documentService: DocumentService;
	let mockUserService: jest.Mocked<UserService>;

	beforeEach(() => {
		mockUserService = new UserService() as jest.Mocked<UserService>; // Instância mockada do UserService
		documentService = new DocumentService(mockUserService);

		mockUserService.getUserById.mockResolvedValue({
			id: 1,
			name: "John Doe",
			email: "john@example.com",
		});

		(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockDocuments));
		(fs.writeFile as jest.Mock).mockResolvedValue(undefined);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getAllDocuments", () => {
		it("should return all documents for a specific user", async () => {
			const documents = await documentService.getAllDocuments(1);
			expect(documents).toEqual([mockDocuments[0]]);
			expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
		});

		it("should throw an error if the user does not exist", async () => {
			mockUserService.getUserById.mockRejectedValueOnce(
				new ApiErrors("Usuário não encontrado", StatusCodes.NOT_FOUND),
			);
			await expect(documentService.getAllDocuments(999)).rejects.toThrow(
				"Usuário não encontrado",
			);
		});
	});

	describe("getDocumentById", () => {
		it("should return a document by id and userId", async () => {
			const document = await documentService.getDocumentById(1, 1);
			expect(document).toEqual(mockDocuments[0]);
			expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
		});

		it("should throw an error if document is not found", async () => {
			await expect(documentService.getDocumentById(999, 1)).rejects.toThrow(
				ApiErrors,
			);
			await expect(documentService.getDocumentById(999, 1)).rejects.toThrow(
				"Documento não encontrado.",
			);
		});
	});

	describe("createDocument", () => {
		it("should create a new document", async () => {
			const newDocument: IDocument = {
				id: 0,
				name: "New Doc",
				status: "active",
				userId: 1,
			};
			const createdDocument = await documentService.createDocument(newDocument);

			expect(createdDocument).toEqual(newDocument);
		});

		it("should throw an error if user does not exist", async () => {
			mockUserService.getUserById.mockRejectedValueOnce(
				new ApiErrors("Usuário não encontrado", StatusCodes.NOT_FOUND),
			);
			const newDocument: IDocument = {
				id: 0,
				name: "New Doc",
				status: "active",
				userId: 999,
			};

			await expect(documentService.createDocument(newDocument)).rejects.toThrow(
				"Usuário não encontrado",
			);
		});
	});

	describe("updateDocument", () => {
		it("should update an existing document", async () => {
			const updatedDocument: IDocument = {
				id: 1,
				name: "Updated Doc",
				status: "inactive",
				userId: 1,
			};
			const document = await documentService.updateDocument(updatedDocument);

			expect(document).toEqual(updatedDocument);
		});

		it("should throw an error if document is not found", async () => {
			const nonExistentDocument: IDocument = {
				id: 999,
				name: "Nonexistent",
				status: "active",
				userId: 1,
			};
			await expect(
				documentService.updateDocument(nonExistentDocument),
			).rejects.toThrow("Documento não encontrado.");
		});
	});

	describe("deleteDocument", () => {
		it("should delete a document by id and userId", async () => {
			const result = await documentService.deleteDocument(1, 1);
			expect(result).toBe(true);
		});

		it("should throw an error if document is not found", async () => {
			await expect(documentService.deleteDocument(999, 1)).rejects.toThrow(
				"Documento não encontrado.",
			);
		});
	});
});
