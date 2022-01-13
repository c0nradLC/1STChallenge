import { sign } from 'jsonwebtoken';

import { IResponseUserAuthenticate } from '../dtos/IResponseUserAuthenticate';
import { IUserDTO } from '../dtos/IUserDTO';

class GenerateUserToken {
  constructor(
  ) { }

  async execute(user: IUserDTO): Promise<IResponseUserAuthenticate> {
    const token = sign({}, process.env.JWT_SECRET_KEY, {
      subject: user.id.toString(),
      expiresIn: '1d',
    });

    const tokenReturn: IResponseUserAuthenticate = {
      token,
      user: {
        nome: user.nome
      },
    };

    return tokenReturn;
  }
}

export { GenerateUserToken };
