import "reflect-metadata";
import { IUserRepository } from "../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { IUserDTO } from "../../dtos/IUserDTO";
import { User } from "../../entities/User";


@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(data: IUserDTO): Promise<User> {
        const user = await this.userRepository.create(data);

        return user;
    }
}

export { CreateUserUseCase }