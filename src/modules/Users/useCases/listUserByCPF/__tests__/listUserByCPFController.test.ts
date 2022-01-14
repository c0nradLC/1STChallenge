import { Request, Response } from "express";
import { hash } from "bcrypt";
import { container } from "tsyringe";

import { ListUserByCPFController } from "../ListUserByCPFController";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { User } from "../../../entities/User";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('List user by CPF - Controller', () => {
    const listUserByCPFController: ListUserByCPFController = new ListUserByCPFController();
    let createUserUseCase: CreateUserUseCase;
    let existentCPF: string;

    beforeAll(async () => {
        await dbConnection.create();

        createUserUseCase = container.resolve(CreateUserUseCase);

        existentCPF = await hash("242.506.180-05".replace(/\D+/g, ""), process.env.BCRYPT_SALT);

        try {
            await createUserUseCase.execute({
                nome: "Leonardo Palhano Conrado",
                telefone: "11538992433",
                cpf: existentCPF,
                cep: "65082-164",
                logradouro: "Rua Profeta II",
                cidade: "São Luís",
                estado: "MA",
            })
        } catch(e) {
            expect(e).toEqual({"message": "Usuário já cadastrado", "statusCode": 422})
        }
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when request is sent with cpf field and HTTP status code 200 is returned', async () => {
        const mReq = ({
            params: {
                cpf: "242.506.180-05"
            }
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        await listUserByCPFController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith(
            expect.any(User)
        );
    })

    it('Should pass when cpf field is missing in request params and HTTP status code 400 is returned', async () => {
        const mReq = ({
            params: {
                cpf: undefined
            }
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        await listUserByCPFController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith("Campo 'cpf' esperado!");
    })

    it("Should pass when the informed cpf does not match any user's cpf and HTTP status code 200 is returned", async () => {
        const mReq = ({
            params: {
                cpf: "111.111.111-11"
            }
        } as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        await listUserByCPFController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith(undefined);
    })
})