import "reflect-metadata";
import { IUserRepository } from "../../repositories/IUserRepository";
import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../../dtos/IUserDTO';

@injectable()
class ListUsersUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(): Promise<IUserDTO[]> {
        const users = await this.userRepository.getAll();

        return users;
    }
}

export { ListUsersUseCase };