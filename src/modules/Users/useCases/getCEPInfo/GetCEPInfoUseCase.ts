import "reflect-metadata";
import { inject, injectable } from 'tsyringe';

import { IViaCepProvider } from "../../../../shared/container/providers/ViaCepProvider/IViaCepProvider";
import { IUserCEPInfoDTO } from "../../dtos/IUserCEPInfoDTO";
import { AppError } from "../../../../errors/AppError";

@injectable()
class GetCEPInfoUseCase {
    constructor(
        @inject('ViaCepProvider')
        private viaCepProvider: IViaCepProvider,
    ) {}
    
    async execute(cep: string): Promise<IUserCEPInfoDTO> {
        const cepInfo = await this.viaCepProvider.getCEPInfo(cep);
    
        if (!cepInfo) {
            throw new AppError("CEP não encontrado", 422);
        }

        return {
            cep: cepInfo.cep,
            cidade: cepInfo.localidade,
            logradouro: cepInfo.logradouro,
            estado: cepInfo.uf
        }
    }
}

export { GetCEPInfoUseCase };