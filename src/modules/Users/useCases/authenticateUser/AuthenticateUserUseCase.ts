import { compare, hash } from 'bcrypt';
import { container, inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IResponseUserAuthenticate } from '../../dtos/IResponseUserAuthenticate';
import { IUserDTO } from '../../dtos/IUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';
import { GenerateUserToken } from '../../utils/GenerateUserToken';

interface IRequest {
  cpf: string;
  telefone: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute({ cpf, telefone }: IRequest): Promise<IResponseUserAuthenticate> {
    const generateUserToken = container.resolve(GenerateUserToken);

    let user: IUserDTO;

    user = await this.userRepository.getByCPF(await hash(cpf, process.env.BCRYPT_SALT));

    if (!user) { 
      throw new AppError('CPF ou Telefone incorreto!', 400); 
    }

    if (telefone !== user.telefone) {
      throw new AppError('CPF ou Telefone incorreto!', 400);
    }

    const response = await generateUserToken.execute(user);

    return response;
  }
}

export { AuthenticateUserUseCase };
