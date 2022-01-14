import "reflect-metadata";
import { container } from "tsyringe";

import { ListUsersUseCase } from "../ListUsersUseCase";
import { User } from "../../../entities/User";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('List users - Use case', () => {
    let listUsersUseCase: ListUsersUseCase;

    beforeAll(async () => {
        await dbConnection.create();
        listUsersUseCase = container.resolve(ListUsersUseCase);
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when an array with User objects is returned', async () => {
        const users = await listUsersUseCase.execute();

        expect(users).toStrictEqual(
            expect.arrayContaining([
                expect.any(User)
            ])
        )
    })
})