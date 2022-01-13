import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        if (!id) {
            return response.status(400).send("Campo 'id' esperado!");    
        }

        const deleteUserUseCase = container.resolve(DeleteUserUseCase);

        const deletedUser = await deleteUserUseCase.execute(Number(id))

        return response.status(204).send(deletedUser);
    }
}

export { DeleteUserController }