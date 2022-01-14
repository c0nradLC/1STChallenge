import "reflect-metadata";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { hash } from "bcrypt";
import { container } from "tsyringe";

import { User } from "../../../entities/User";
import { DeleteUserController } from "../DeleteUserController";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Delete user - Controller', () => {
    const deleteUserController: DeleteUserController = new DeleteUserController();
    let userId: number;

    beforeAll(async () => {
        await dbConnection.create();
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when request is sent in the correct format and HTTP status code 204 is returned', async () => {
        const createUserUseCase = container.resolve(CreateUserUseCase)

        try {
            userId = (await createUserUseCase.execute({
                nome: "Usuário teste",
                telefone: "(11) 11111-1111",
                cpf: await hash("111.111.111-11", process.env.BCRYPT_SALT),
                cep: "95059340",
                logradouro: "Rua 11",
                cidade: "Cidade 11",
                estado: "Estado 11",
            })).id

        } catch (e) {
            userId = (await getRepository(User).findOne()).id

        } finally {
            const mReq = ({
                params: {
                    id: userId
                },
            } as unknown) as Request;
    
            const mRes = ({
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            } as unknown) as Response;
    
            await deleteUserController.handle(mReq, mRes);
    
            expect(mRes.status).toBeCalledWith(204);
            expect(mRes.send).toHaveBeenCalled();
        }
    })

    it('Should pass when ID field is missing and HTTP status code 400 is returned', async () => {
        const mReq = ({
            params: {
                id: undefined
            },
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        } as unknown) as Response;

        await deleteUserController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith({"error": 400, "message": "Id não informado!"});
    })
})