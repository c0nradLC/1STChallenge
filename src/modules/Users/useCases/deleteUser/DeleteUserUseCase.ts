import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserDTO } from "../../dtos/IUserDTO";
import { AppError } from "../../../../errors/AppError";

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    async execute(userId: number, permissions: string): Promise<IUserDTO> {
        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new AppError("Este usuário não existe", 422);
        }

        if (user.cpf !== permissions) {
            throw new AppError("Usuário sem permissões", 403);
        }

        const deletedUser = await this.userRepository.deleteById(userId);

        return deletedUser;
    }
}

export { DeleteUserUseCase };