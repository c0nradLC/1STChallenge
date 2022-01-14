import "reflect-metadata";
import { container } from "tsyringe";
import { getRepository } from "typeorm";
import { hash } from "bcrypt";

import { CreateUserUseCase } from "../CreateUserUseCase";
import { IUserDTO } from "../../../dtos/IUserDTO";
import { ListUserByCPFUseCase } from "../../listUserByCPF/ListUserByCPFUseCase";
import { User } from "../../../entities/User";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Create user - Use case', () => {
    let createUserUseCase: CreateUserUseCase;
    let listUserByCPFUseCase: ListUserByCPFUseCase;
    let cpf: string;

    let data: IUserDTO;

    beforeAll(async () => {
        await dbConnection.create(); 
        createUserUseCase = container.resolve(CreateUserUseCase);
        listUserByCPFUseCase = container.resolve(ListUserByCPFUseCase);

        cpf = await hash("242.506.180-05".replace(/\D+/g, ""), process.env.BCRYPT_SALT);

        data = {
            nome: "Leonardo Palhano Conrado",
            telefone: "11538992433",
            cpf: cpf,
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        };

        const user = await listUserByCPFUseCase.execute(cpf);

        if (user) {
            getRepository(User).delete([user.id]);
        }
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when information supplied is sufficient', async () => {
        const user = await createUserUseCase.execute(data);
        delete user.id;

        expect(user).toEqual(data);
    })

    it('Should pass when any field is missing and exception is thrown', async () => {
        await expect(createUserUseCase.execute({
            nome: "Leonardo Palhano Conrado",
            telefone: "11538992433",
            cpf: undefined,
            cep: "65082-164",
            logradouro: "Rua Profeta II",
            cidade: "São Luís",
            estado: "MA",
        })).rejects.toThrow();
    })
})