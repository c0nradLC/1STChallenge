import "reflect-metadata";
import { inject, injectable } from 'tsyringe';

import { IUserDTO } from '../../dtos/IUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IViaCepProvider } from "../../../../shared/container/providers/ViaCepProvider/IViaCepProvider";
import { AppError } from "../../../../errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('ViaCepProvider')
    private viaCepProvider: IViaCepProvider
  ) { }

  async execute(data: IUserDTO): Promise<User> {

    const user = await this.userRepository.getById(data.id);

    if (!user) {
      throw new AppError("Este usuário não existe", 422);
    }

    Object.assign(data, await this.viaCepProvider.getCEPInfo(data.cep).then((response) => {
      return {
          cep: response.cep,
          cidade: response.localidade,
          logradouro: response.logradouro,
          estado: response.uf
      };
    }));

    if (user.cpf !== data.permissions) {
      throw new AppError("Usuário sem permissões", 403);
    }
    
    const updatedUser = await this.userRepository.update(data);
    delete updatedUser.cpf;

    return updatedUser;
  }
}

export { UpdateUserUseCase };
