import "reflect-metadata"
import { container } from "tsyringe";

import { GetCEPInfoUseCase } from "../GetCEPInfoUseCase";

import { dbConnection } from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Get CEP information - Use case', () => {
    let getCEPInfoUseCase: GetCEPInfoUseCase;

    beforeAll(async () => {
        await dbConnection.create();
        getCEPInfoUseCase = container.resolve(GetCEPInfoUseCase);
    })

    afterAll(async() => {
        await dbConnection.close();
    })

    it('Should pass when a string with a valid CEP is informed and the CEP information is returned', async () => {
        const cepWithDash = await getCEPInfoUseCase.execute("59275-970");
        const cepWithoutDash = await getCEPInfoUseCase.execute("59275970");

        expect(cepWithoutDash && cepWithDash).toHaveProperty("cep");
        expect(cepWithoutDash && cepWithDash).toHaveProperty("cidade");
        expect(cepWithoutDash && cepWithDash).toHaveProperty("estado");
        expect(cepWithoutDash && cepWithDash).toHaveProperty("logradouro");
    })

    it('Should pass when a string is informed with an unexistent CEP', async () => {
        const cepWithDash = await getCEPInfoUseCase.execute("00001-000");
        const cepWithoutDash = await getCEPInfoUseCase.execute("00001000");

        expect(cepWithoutDash && cepWithDash).toEqual({});
    })

    it('Should pass when a string is informed with an invalid CEP format or when no string is informed', async () => {
        await expect(getCEPInfoUseCase.execute("592759700"))
        .rejects.toEqual({"message": "CEP não encontrado", "statusCode": 422});

        await expect(getCEPInfoUseCase.execute("592759-700"))
        .rejects.toEqual({"message": "CEP não encontrado", "statusCode": 422});

        await expect(getCEPInfoUseCase.execute(undefined))
        .rejects.toEqual({"message": "CEP não encontrado", "statusCode": 422});
    })
})