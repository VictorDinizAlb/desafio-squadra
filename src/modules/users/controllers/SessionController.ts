import { Request, Response } from 'express';
import CriarSessionService from '../services/CriarSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const createSession = new CriarSessionService();

    const user = await createSession.execute({
      email,
      senha
    })

    return response.json(user);
  }
}
