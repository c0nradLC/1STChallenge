import { UpdateUserUseCase } from "../UpdateUserUseCase";
import { container } from "tsyringe";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';
import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IUserDTO } from "modules/Users/dtos/IUserDTO";

describe('Update user - Use case', () => {
    let updateUserUseCase: UpdateUserUseCase;
    let userId: number;

    beforeAll(async () => {
        await dbConnection.create();
        updateUserUseCase = container.resolve(UpdateUserUseCase);

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
        const data: IUserDTO = {
            id: userId,
            nome: "Leonardo Palhano Conrado",
            telefone: "(11) 53899-2433",
            cpf: "242.506.180-05",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        };

        const user = await updateUserUseCase.execute(data);

        expect(user).toEqual(data);
    })

    it('Should pass when ID field is missing and exception is thrown', async () => {
        await expect(updateUserUseCase.execute({
            nome: "Leonardo Palhano Conrado",
            telefone: "(11) 53899-2433",
            cpf: "167.589.209-17",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })).rejects.toThrow();
    })

    it('Should pass when an unexisting ID is informed and AppError is thrown', async () => {
        await expect(updateUserUseCase.execute({
            id: 2147483647,
            nome: "Leonardo Palhano Conrado",
            telefone: "(11) 53899-2433",
            cpf: "167.589.209-17",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })).rejects.toEqual({"message": "Este usuário não existe", "statusCode": 422});
    })
})