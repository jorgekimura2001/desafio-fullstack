import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listUsersService from "../services/users/listUsers.service";
import listRetrieveUserService from "../services/users/listRetrieveUser.service";
import createUserService from "../services/users/createUser.service";
import updateUserService from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const { full_name, email, telephone, password } = req.body;

  const newUser = await createUserService({
    full_name,
    email,
    telephone,
    password,
  });

  return res.status(201).json(instanceToPlain(newUser));
};

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.json(instanceToPlain(users));
};

export const listRetrieveUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await listRetrieveUserService(id);

  return res.json(instanceToPlain(user));
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body

  const user = await updateUserService(data, id);

  return res.json(instanceToPlain(user));
};
