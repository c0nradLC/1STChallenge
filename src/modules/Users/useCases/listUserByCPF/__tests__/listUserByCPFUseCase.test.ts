import { ListUserByCPFUseCase } from "../ListUserByCPFUseCase";
import { container } from "tsyringe";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';
import { User } from "../../../entities/User";
import { getRepository } from "typeorm";

describe('List user by CPF - Use case', () => {
    let listUserByCPFUseCase: ListUserByCPFUseCase;

    beforeAll(async () => {
        await dbConnection.create();
        listUserByCPFUseCase = container.resolve(ListUserByCPFUseCase);
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when a string is informed and the user with the CPF equal to the string is returned', async () => {
        const user = await listUserByCPFUseCase.execute("242.506.180-05");
        const userSearch = await getRepository(User).findOne(user);

        expect(user).toEqual(userSearch);
    })

    it('Should pass when a string is informed and there is no user with its CPF equal to the informed string', async () => {
        const user = await listUserByCPFUseCase.execute("111.111.111-11");

        expect(user).toEqual(undefined);
    })

    it('Should pass when no string is informed and useCase returns undefined', async () => {
        const user = await listUserByCPFUseCase.execute(undefined);

        expect(user).toEqual(undefined);
    })
})