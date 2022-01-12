import { ListUsersUseCase } from "../ListUsersUseCase";
import { container } from "tsyringe";
import { User } from "../../../entities/User";

import connection from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('List users - Use case', () => {
    let listUsersUseCase: ListUsersUseCase;

    beforeAll(async () => {
        await connection.create();
        listUsersUseCase = container.resolve(ListUsersUseCase);
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