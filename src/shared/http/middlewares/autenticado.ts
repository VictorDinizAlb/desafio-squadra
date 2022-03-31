import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface Jwt{
  id: number;
  nome: string;
  iat: number;
}

export default function autenticado(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError('JWT is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {

    const decodeToken = verify(token, authConfig.jwt.secret)

    const { id } = decodeToken as Jwt;

    request.user = {
      id: id
    }

    return next();
  } catch {
    throw new AppError('Invalid Token.')
  }
}
