import { Router } from "express";

import { CreateUserController } from "../modules/Users/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/Users/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "../modules/Users/useCases/updateUser/UpdateUserController";
import { DeleteUserController } from "../modules/Users/useCases/deleteUser/DeleteUserController";
import { ListUserByCPFController } from "../modules/Users/useCases/listUserByCPF/ListUserByCPFController";
import { GetCEPInfoController } from "../modules/Users/useCases/getCEPInfo/GetCEPInfoController";

import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const listUserByCPFController = new ListUserByCPFController();
const getCEPInfoController = new GetCEPInfoController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get('/', ensureAuthenticated, listUsersController.handle);

usersRoutes.put('/', ensureAuthenticated, updateUserController.handle);

usersRoutes.delete('/:id', ensureAuthenticated, deleteUserController.handle);

usersRoutes.get('/:cpf', ensureAuthenticated, listUserByCPFController.handle);

usersRoutes.get('/cep/:cep', ensureAuthenticated, getCEPInfoController.handle)

export { usersRoutes };