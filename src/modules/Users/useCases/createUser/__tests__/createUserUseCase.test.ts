import { CreateUserUseCase } from "../CreateUserUseCase";
import { container } from "tsyringe";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

import { getRepository } from "typeorm";
import { IUserDTO } from "../../../dtos/IUserDTO";

describe('Create user - Use case', () => {
    let createUserUseCase: CreateUserUseCase;

    beforeAll(async () => {
        await dbConnection.create(); 
        createUserUseCase = container.resolve(CreateUserUseCase);
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when information supplied is sufficient', async () => {
        const data: IUserDTO = {
            nome: "Leonardo Palhano Conrado",
            telefone: "(11) 53899-2433",
            cpf: "242.506.180-05",
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        };
        
        const user = await createUserUseCase.execute(data);
        delete user.id;

        expect(user).toEqual(data);
    })

    it('Should pass when any field is missing and exception is thrown', async () => {
        await expect(createUserUseCase.execute({
            nome: "Leonardo Palhano Conrado",
            telefone: "(11) 53899-2433",
            cpf: undefined,
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })).rejects.toThrow();
    })
})