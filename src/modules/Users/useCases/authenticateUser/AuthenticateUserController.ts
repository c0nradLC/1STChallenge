import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { telefone, cpf } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    if (!telefone || !cpf) {
        return response.status(400).send('Preencha todos os campos');
    }

    const res = await authenticateUserUseCase.execute({
        telefone,
        cpf,
    })
    
    return response.status(200).send(res);
  }
}

export { AuthenticateUserController };
