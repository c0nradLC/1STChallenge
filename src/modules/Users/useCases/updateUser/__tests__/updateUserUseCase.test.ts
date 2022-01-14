import "reflect-metadata";
import { container } from "tsyringe";
import { getRepository } from "typeorm";
import { hash } from "bcrypt";

import { UpdateUserUseCase } from "../UpdateUserUseCase";
import { User } from "../../../entities/User";
import { IUserDTO } from "modules/Users/dtos/IUserDTO";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Update user - Use case', () => {
    let updateUserUseCase: UpdateUserUseCase;
    let user: User;

    beforeAll(async () => {
        await dbConnection.create();
        updateUserUseCase = container.resolve(UpdateUserUseCase);

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
        const data: IUserDTO = {
            id: user.id,
            nome: "Leonardo Palhano Conrado",
            telefone: "11538992433",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
            permissions: user.cpf
        };

        const updatedUser = await updateUserUseCase.execute(data);
        delete data.permissions;

        expect(updatedUser).toEqual(data);
    })

    it('Should pass when an unexisting ID is informed and AppError is thrown', async () => {
        await expect(updateUserUseCase.execute({
            id: 2147483647,
            nome: "Leonardo Palhano Conrado",
            telefone: "11538992433",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })).rejects.toEqual({"message": "Este usuário não existe", "statusCode": 422});
    })

    it('Should pass when valid ID is informed but user has no permissions and AppError is thrown', async () => {
        await expect(updateUserUseCase.execute({
            id: user.id,
            nome: "Leonardo Palhano Conrado",
            telefone: "11538992433",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })).rejects.toEqual({"message": "Usuário sem permissões", "statusCode": 403});
    })
})