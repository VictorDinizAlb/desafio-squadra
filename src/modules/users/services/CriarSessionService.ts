import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CriarSessionService {
  public async execute({email, senha}: IRequest): Promise<IResponse | undefined>{
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    if(!user){
      return undefined;
    }

    const senhaConfirmada = await compare(senha, user.senha);

    if(!senhaConfirmada){
      return undefined;
    }

    const token = sign({
      id: user.codigoUser,
      nome: user.nome,
    },
    authConfig.jwt.secret,
    );

    return {
      user,
      token
    };
  }
}
