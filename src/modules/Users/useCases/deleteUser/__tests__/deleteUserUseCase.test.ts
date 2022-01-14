import { getRepository } from "typeorm";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "../DeleteUserUseCase";
import { User } from "../../../entities/User";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Delete user - Use case', () => {
    let deleteUserUseCase: DeleteUserUseCase;
    let user: User;

    beforeAll(async () => {
        await dbConnection.create();
        deleteUserUseCase = container.resolve(DeleteUserUseCase);

        try {
            user = (await getRepository(User).findOne());
        } catch (e) {
            user = getRepository(User).create({
                nome: "Usuário teste",
                telefone: "(11) 11111-1111",
                cpf: "111.111.111-11",
                cep: "11111-111",
                logradouro: "Rua 11",
                cidade: "Cidade 11",
                estado: "Estado 11",
            });
        }
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when information supplied is sufficient', async () => {
        const deletedUser = await deleteUserUseCase.execute(user.id, user.cpf);
        expect(deletedUser);
    })

    it('Should pass when ID field is missing and exception is thrown', async () => {
        await expect(deleteUserUseCase.execute(undefined, ""))
        .rejects.toThrow();
    })

    it('Should pass when an unexisting ID is informed and AppError is thrown', async () => {
        await expect(deleteUserUseCase.execute(2147483647, user.cpf))
        .rejects.toEqual({"message": "Este usuário não existe", "statusCode": 422});
    })
})