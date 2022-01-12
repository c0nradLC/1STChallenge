import { GetCEPInfoUseCase } from "../GetCEPInfoUseCase";
import { container } from "tsyringe";

import connection from '../../../../../utils/tests/createConnection';
import '../../../../../shared/container/index';

describe('Get CEP information - Use case', () => {
    let getCEPInfoUseCase: GetCEPInfoUseCase;

    beforeAll(async () => {
        await connection.create();
        getCEPInfoUseCase = container.resolve(GetCEPInfoUseCase);
    })

    it('Should pass when a string is informed and the CEP information is returned', async () => {

        const cep = await getCEPInfoUseCase.execute("59275970");

        expect(cep).toHaveProperty("cep");
        expect(cep).toHaveProperty("cidade");
        expect(cep).toHaveProperty("estado");
        expect(cep).toHaveProperty("logradouro");
    })

    // it('Should pass when a string is informed and there is no user with its CPF equal to the informed string', async () => {
    //     const user = await getCEPInfoUseCase.execute("111.111.111-11");

    //     expect(user).toEqual(undefined);
    // })

    // it('Should pass when no string is informed and useCase returns undefined', async () => {
    //     const user = await getCEPInfoUseCase.execute(undefined);

    //     expect(user).toEqual(undefined);
    // })
})