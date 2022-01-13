import { DeleteUserController } from "../DeleteUserController";
import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { Request, Response } from "express";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Delete user - Controller', () => {
    const deleteUserController: DeleteUserController = new DeleteUserController();
    let userId: number;

    beforeAll(async () => {
        await dbConnection.create();

        try {
            userId = (await getRepository(User).findOne()).id;
        } catch (e) {
            userId = getRepository(User).create({
                nome: "Usuário teste",
                telefone: "(11) 11111-1111",
                cpf: "111.111.111-11",
                cep: "11111-111",
                logradouro: "Rua 11",
                cidade: "Cidade 11",
                estado: "Estado 11",
            })?.id;
        }
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when request is sent in the correct format and HTTP status code 204 is returned', async () => {
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
        expect(mRes.send).toBeCalledWith("Campo 'id' esperado!");
    })

    it('Should pass when ID is of an unexisting user and HTTP status code 422 is returned', async () => {
        const mReq = ({
            params: {
                id: 2147483647
            },
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        } as unknown) as Response;

        await deleteUserController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(422);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith('Este usuário não existe');
    })
})