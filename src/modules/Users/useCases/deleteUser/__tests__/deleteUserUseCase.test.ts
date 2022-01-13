import { DeleteUserUseCase } from "../DeleteUserUseCase";
import { container } from "tsyringe";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';
import { getRepository } from "typeorm";
import { User } from "../../../entities/User";

describe('Delete user - Use case', () => {
    let deleteUserUseCase: DeleteUserUseCase;
    let userId: number;

    beforeAll(async () => {
        await dbConnection.create();
        deleteUserUseCase = container.resolve(DeleteUserUseCase);

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

    it('Should pass when information supplied is sufficient', async () => {
        const user = await deleteUserUseCase.execute(userId);
        expect(user);
    })

    it('Should pass when ID field is missing and exception is thrown', async () => {
        await expect(deleteUserUseCase.execute(undefined))
        .rejects.toThrow();
    })

    it('Should pass when an unexisting ID is informed and AppError is thrown', async () => {
        await expect(deleteUserUseCase.execute(2147483647))
        .rejects.toEqual({"message": "Este usuário não existe", "statusCode": 422});
    })
})