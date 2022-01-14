import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { permissions } = request.body;

        if (!id) {
            return response.status(400).send({error: 400, message: "Id não informado!"});    
        }

        const deleteUserUseCase = container.resolve(DeleteUserUseCase);

        const deletedUser = await deleteUserUseCase.execute(Number(id), permissions)

        return response.status(204).send(deletedUser);
    }
}

export { DeleteUserController }