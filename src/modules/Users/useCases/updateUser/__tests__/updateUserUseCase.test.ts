import { UpdateUserUseCase } from "../UpdateUserUseCase";
import { container } from "tsyringe";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';
import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IUserDTO } from "modules/Users/dtos/IUserDTO";
import { hash } from "bcrypt";

describe('Update user - Use case', () => {
    let updateUserUseCase: UpdateUserUseCase;
    let userId: number;
    let cpf: string;
    let cpfUpdate: string;

    beforeAll(async () => {
        await dbConnection.create();
        updateUserUseCase = container.resolve(UpdateUserUseCase);

        cpf = await hash("242.506.180-05", process.env.BCRYPT_SALT);

        try {
            userId = (await getRepository(User).findOne()).id;
        } catch (e) {
            userId = getRepository(User).create({
                nome: "Usuário teste",
                telefone: "11111111111",
                cpf: cpf,
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
            telefone: "11538992433",
            cpf: cpf,
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        };

        const user = await updateUserUseCase.execute(data);

        expect(user).toEqual(data);
    })

    it('Should pass when cpf field is missing and exception is thrown', async () => {
        await expect(updateUserUseCase.execute({
            nome: "Leonardo Palhano Conrado",
            telefone: "11538992433",
            cpf: undefined,
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
            telefone: "11538992433",
            cpf: cpfUpdate,
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })).rejects.toEqual({"message": "Este usuário não existe", "statusCode": 422});
    })
})