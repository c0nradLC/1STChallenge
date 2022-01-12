import "reflect-metadata";
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            id,
            nome,
            telefone,
            cpf,
            cep,
            logradouro,
            cidade,
            estado
        } = request.body;

        if (!id || !nome || !telefone || !cpf || !cep || !logradouro || !cidade || !estado) {
            return response.status(400).send('Preencha todos os campos');
        }

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        await updateUserUseCase.execute({
            id: id,
            nome: nome,
            telefone: telefone,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            cidade: cidade,
            estado: estado
        })
        .catch((res) => {
            return response.status(res.statusCode).send(res.message);
        });

        return response.status(200).send();
    }
}
  
export { UpdateUserController };
  