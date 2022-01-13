import "reflect-metadata";
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';
import { hash } from "bcrypt";

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

        const telefoneRep = telefone.replace(/\D+/g, "");

        const cpfRep = await hash(cpf.replace(/\D+/g, ""), process.env.BCRYPT_SALT);

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const user = await updateUserUseCase.execute({
            id: id,
            nome: nome,
            telefone: telefoneRep,
            cpf: cpfRep,
            cep: cep,
            logradouro: logradouro,
            cidade: cidade,
            estado: estado
        })

        return response.status(200).send(user);
    }
}
  
export { UpdateUserController };
  