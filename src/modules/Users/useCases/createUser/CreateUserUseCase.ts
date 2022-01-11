import "reflect-metadata";
import { IUserRepository } from "../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { IUserDTO } from "../../dtos/IUserDTO";


@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(data: IUserDTO) {
        await this.userRepository.create(data);
    }
}

export { CreateUserUseCase }