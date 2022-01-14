import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/Users/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.getById(Number(sub.split(':')[0]));

    if (!user) {
      throw new AppError("Usuário não existe", 401);
    }

    if (user.cpf !== sub.split(':')[1]) {
      throw new AppError("Token inválido", 401);
    }

    request.body.permissions = user.cpf;

    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}
