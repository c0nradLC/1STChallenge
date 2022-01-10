import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../../dtos/IUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { AppError } from "../../../../errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  async execute(data: IUserDTO): Promise<User> {

    const user = await this.userRepository.getById(data.id);

    if (!user) {
      throw new AppError("Este usuário não existe");
    }
    
    const updatedUser = await this.userRepository.update(data);

    return updatedUser;
  }
}

export { UpdateUserUseCase };
