import { ListUserByCPFController } from "../ListUserByCPFController";
import { User } from "../../../entities/User";
import { Request, Response } from "express";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('List user by CPF - Controller', () => {
    const listUserByCPFController: ListUserByCPFController = new ListUserByCPFController();

    beforeAll(async () => {
        await dbConnection.create();
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