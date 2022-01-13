import { ListUsersController } from "../ListUsersController";
import { User } from "../../../entities/User";
import { Request, Response } from "express";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('List users - Controller', () => {
    const listUsersController: ListUsersController = new ListUsersController();

    beforeAll(async () => {
        await dbConnection.create();
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when request is sent and HTTP status code 200 is returned', async () => {
        const mReq = ({} as unknown) as Request;
        const mRes = ({
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown) as Response;

        await listUsersController.handle(mReq, mRes);

        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toHaveBeenCalled();
        expect(mRes.send).toBeCalledWith(
            expect.arrayContaining([
                expect.any(User)
            ])
        );
    })
})