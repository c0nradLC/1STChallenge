import { UpdateUserController } from "../UpdateUserController";
import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { Request, Response } from "express";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Update user - Controller', () => {
    const updateUserController: UpdateUserController = new UpdateUserController();
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

    it('Should pass when request is sent in the correct format and HTTP status code 200 is returned', async () => {
        const mReq = ({
            body: {
                id: userId,
                nome: "Leonardo Palhano Conrado",
                telefone: "(11) 53899-2433",
                cpf: "242.506.180-05",
                cep: "65082-164",
                logradouro: "Rua Profeta II",
                cidade: "São Luís",
                estado: "MA",
            },
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        await updateUserController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toHaveBeenCalled();
    })

    it('Should pass when any field is missing and HTTP status code 400 is returned', async () => {
        const mReq = ({
            body: {
                nome: "Leonardo Palhano Conrado",
                telefone: "(11) 53899-2433",
                cpf: "242.506.180-05",
                cep: "65082-164",
                logradouro: "Rua Profeta II",
                cidade: "São Luís",
                estado: "MA",
            },
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        } as unknown) as Response;

        await updateUserController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith('Preencha todos os campos');
    })

    it('Should pass when ID is of an unexisting user and HTTP status code 422 is returned', async () => {
        const mReq = ({
            body: {
                id: 2147483647,
                nome: "Leonardo Palhano Conrado",
                telefone: "(11) 53899-2433",
                cpf: "242.506.180-05",
                cep: "65082-164",
                logradouro: "Rua Profeta II",
                cidade: "São Luís",
                estado: "MA",
            },
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        } as unknown) as Response;

        await updateUserController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(422);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith('Este usuário não existe');
    })
})