import "reflect-metadata";
import { inject, injectable } from 'tsyringe';

import { IUserDTO } from '../../dtos/IUserDTO';
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class ListUserByCPFUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(cpf: string): Promise<IUserDTO> {
        const user = await this.userRepository.getByCPF(cpf);
    
        return user;
    }
}

export { ListUserByCPFUseCase };