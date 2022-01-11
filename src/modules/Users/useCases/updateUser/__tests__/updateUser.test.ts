import { UpdateUserUseCase } from "../UpdateUserUseCase";
import { container } from "tsyringe";

import connection from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';
import { getRepository } from "typeorm";
import { User } from "../../../entities/User";

describe('Update user - Use case', () => {
    let updateUserUseCase: UpdateUserUseCase;
    let userId: number;

    beforeAll(async () => {
        await connection.create();
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

    it('Should pass when information supplied is sufficient', async () => {
        const response = await updateUserUseCase.execute({
            id: userId,
            nome: "Leonardo Palhano Conrado",
            telefone: "(11) 53899-2433",
            cpf: "242.506.180-05",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })
        expect(response);
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
})