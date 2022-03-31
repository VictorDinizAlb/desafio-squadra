import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  nome: string;
  email: string;
  senha: string;
}

export default class CriarUserService {
  public async execute({nome, email, senha}: IRequest): Promise<User | undefined>{
    const userRepository = getCustomRepository(UsersRepository);
    const emailExists = await userRepository.findByEmail(email);
    let avatar = "Victor";

    if(emailExists !== undefined) {
      return undefined;
    }

    const senhaCriptografada = await hash(senha, 8);

    const user = await userRepository.create({
      nome,
      email,
      senha: senhaCriptografada,
      avatar
    });

    await userRepository.save(user);
    return user;
  }
}
