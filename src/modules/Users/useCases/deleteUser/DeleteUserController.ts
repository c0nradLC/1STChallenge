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

        await deleteUserUseCase.execute(Number(id))
        .then(() => {
            return response.status(204).send();
        })
        .catch((res) => {
            return response.status(res.statusCode).send(res.message);
        });
    }
}

export { DeleteUserController }