import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserByCPFUseCase } from "./ListUserByCPFUseCase";

class ListUserByCPFController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        if (!cpf) {
            return response.status(400).send("Campo 'cpf' esperado!");    
        }

        const listUserByCPFUseCase = container.resolve(ListUserByCPFUseCase);
    
        const user = await listUserByCPFUseCase.execute(String(cpf));
    
        return response.status(200).send(user);
    }
}

export { ListUserByCPFController }