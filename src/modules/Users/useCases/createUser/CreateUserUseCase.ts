import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserDTO } from "../../dtos/IUserDTO";
import { User } from "../../entities/User";
import { IViaCepProvider } from "../../../../shared/container/providers/ViaCepProvider/IViaCepProvider";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('ViaCepProvider')
        private viaCepProvider: IViaCepProvider
    ) {}

    async execute(data: IUserDTO): Promise<User> {

        Object.assign(data, await this.viaCepProvider.getCEPInfo(data.cep).then((response) => {
            return {
                cep: response.cep,
                cidade: response.localidade,
                logradouro: response.logradouro,
                estado: response.uf
            };
        }));

        if (await this.userRepository.getByCPF(data?.cpf)) {
            throw new AppError("Usuário já cadastrado", 422);
        }

        const userCreated = await this.userRepository.create(data);

        return userCreated;
    }
}

export { CreateUserUseCase }