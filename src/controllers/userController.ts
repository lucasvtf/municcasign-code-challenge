import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/userService";

class UserController {
	private service: UserService;

	constructor() {
		this.service = new UserService();
	}

	public getAllUsers = async (
		_req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const users = await this.service.getAllUsers();
			return res.status(StatusCodes.OK).json(users);
		} catch (error) {
			next(error);
		}
	};

	public getUserById = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { userId } = req.params;
			const user = await this.service.getUserById(+userId);

			return res.status(StatusCodes.OK).json(user);
		} catch (error) {
			next(error);
		}
	};

	public createUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const newUser = await this.service.createUser(req.body);
			return res.status(StatusCodes.CREATED).json(newUser);
		} catch (error) {
			next(error);
		}
	};

	public updateUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { userId } = req.params;
			const updatedUser = await this.service.updateUser(+userId, req.body);

			return res.status(StatusCodes.OK).json(updatedUser);
		} catch (error) {
			next(error);
		}
	};

	public deleteUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { userId } = req.params;
			const deleted = await this.service.deleteUser(+userId);
			if (deleted) {
				return res.status(StatusCodes.NO_CONTENT).send();
			}
			return res.status(StatusCodes.NOT_FOUND).send();
		} catch (error) {
			next(error);
		}
	};
}

export default UserController;
