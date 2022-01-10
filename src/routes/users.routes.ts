import { Router } from "express";

import { CreateUserController } from "../modules/Users/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/Users/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "../modules/Users/useCases/updateUser/UpdateUserController";
import { DeleteUserController } from "../modules/Users/useCases/deleteUser/DeleteUserController";
import { ListUserByCPFController } from "../modules/Users/useCases/listUserByCPF/ListUserByCPFController";
import { GetCEPInfoController } from "../modules/Users/useCases/getCEPInfo/GetCEPInfoController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const listUserByCPFController = new ListUserByCPFController();
const getCEPInfoController = new GetCEPInfoController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get('/', listUsersController.handle);

usersRoutes.put('/', updateUserController.handle);

usersRoutes.delete('/:id', deleteUserController.handle);

usersRoutes.get('/:cpf', listUserByCPFController.handle);

usersRoutes.get('/cep/:cep', getCEPInfoController.handle)

export { usersRoutes };