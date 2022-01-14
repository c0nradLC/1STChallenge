import { Request, Response } from "express";
import { hash } from "bcrypt";

import { CreateUserController } from "../CreateUserController";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Create user - Controller', () => {
    const createUserController: CreateUserController = new CreateUserController();

    beforeAll(async () => {
        await dbConnection.create();
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when request is sent in the correct format and HTTP status code 201 is returned', async () => {
        const mReq = ({
            body: {
                nome: "Leonardo Palhano Conrado",
                telefone: "(11) 53899-2433",
                cpf: "242.506.180-05",
                cep: "65082-164",
                logradouro: "Rua Profeta II",
                cidade: "São Luís",
                estado: "MA",
            }
        } as unknown) as Request;

        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        try {
            await createUserController.handle(mReq, mRes);

            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.send).toHaveBeenCalled();
            expect(mRes.send).toHaveBeenCalledWith({
                nome: "Leonardo Palhano Conrado",
                telefone: "11538992433",
                cpf: await hash('24250618005', process.env.BCRYPT_SALT),
                cep: "65082-164",
                logradouro: "Rua Profeta II",
                cidade: "São Luís",
                estado: "MA",
            });
        } catch(e) {
            expect(e).toEqual({message: "Usuário já cadastrado", statusCode: 422})
        }
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
        expect(mRes.send).toBeCalledWith({"error": 400, "message": "Preencha todos os campos"});
    })

    it('Should pass when informed CPF is invalid and status code 400 is returned', async () => {
        const mReq = ({
            body: {
                nome: "Leonardo Palhano Conrado",
                telefone: "(11) 53899-2433",
                cpf: "111.111.111-11",
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
        expect(mRes.send).toBeCalledWith({"error": 400, "message": "CPF inválido"});
    })
})