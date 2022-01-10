import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserDTO } from "../../dtos/IUserDTO";

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    async execute(userId: number): Promise<IUserDTO> {
        const user = await this.userRepository.deleteById(userId);

        return user;
    }
}

export { DeleteUserUseCase };