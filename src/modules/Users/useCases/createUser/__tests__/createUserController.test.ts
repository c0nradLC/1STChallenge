import { CreateUserController } from "../CreateUserController";

import { Request, Response } from "express";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';
import { IUserDTO } from "modules/Users/dtos/IUserDTO";

describe('Create user - Controller', () => {
    const createUserController: CreateUserController = new CreateUserController();

    beforeAll(async () => {
        await dbConnection.create();
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when request is sent in the correct format and HTTP status code 201 is returned', async () => {
        const data: IUserDTO = {
            nome: "Leonardo Palhano Conrado",
            telefone: "(11) 53899-2433",
            cpf: "242.506.180-05",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        }

        const mReq = ({
            body: data
        } as unknown) as Request;

        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        await createUserController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(201);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith(data);
    })

    it('Should pass when any field is missing and HTTP status code 400 is returned', async () => {
        const mReq = ({
            body: {
                nome: "Leonardo Palhano Conrado",
                telefone: "(11) 53899-2433",
                cpf: undefined,
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

        await createUserController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith('Preencha todos os campos');
    })
})