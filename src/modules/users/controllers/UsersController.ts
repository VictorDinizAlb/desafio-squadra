import { Request, Response } from "express";
import CriarUserService from "../services/CriarUserService";
import ListarUsersService from "../services/ListarUsersService";

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listarUsers = new ListarUsersService();
    const users = await listarUsers.execute();

    console.log(request.user.id);

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {nome, email, senha} = request.body;

    const criarUser = new CriarUserService();

    const user = await criarUser.execute({
      nome,
      email,
      senha
    })

    return response.json(user);
  }
}
