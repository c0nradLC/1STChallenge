import "reflect-metadata"
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCEPInfoController } from "../GetCEPInfoController";
import { GetCEPInfoUseCase } from "../GetCEPInfoUseCase";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Get CEP information - Controller', () => {
    const getCEPInfoController: GetCEPInfoController = new GetCEPInfoController();
    let getCEPInfoUseCase: GetCEPInfoUseCase;
    const OLD_ENV = process.env;

    beforeAll(async () => {
        await dbConnection.create();
        process.env = { ...OLD_ENV };
        process.env.REDIS_HOST = '127.0.0.1';
        getCEPInfoUseCase = container.resolve(GetCEPInfoUseCase);
    })

    afterAll(async() => {
        process.env = OLD_ENV;
        await dbConnection.close();
    })

    it('Should pass when request is sent in the correct format and HTTP status code 200 is returned', async () => {
        const mReq = ({
            params: {
                cep: "59275-970"
            }
        } as unknown) as Request;

        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        await getCEPInfoController.handle(mReq, mRes).then(async() => await getCEPInfoController.handle(mReq, mRes));
        
        const cepInfo = await getCEPInfoUseCase.execute("59275-970");

        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith(cepInfo);
    })

    it('Should pass when cep field is missing and HTTP status code 400 is returned', async () => {
        const mReq = ({
            params: {},
        } as unknown) as Request;

        const mRes = ({
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        } as unknown) as Response;

        await getCEPInfoController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith({"error": 400, "message": "CEP não informado!"});
    })

    it('Should pass when informed cep is invalid and HTTP status code 400 is returned', async () => {
        const mReq = ({
            params: {
                cep: "59275-9702"
            },
        } as unknown) as Request;

        const mRes = ({
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        } as unknown) as Response;

        await getCEPInfoController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith({"error": 400, "message": "CEP inválido!"});
    })
})