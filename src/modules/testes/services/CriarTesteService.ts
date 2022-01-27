import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Teste from '../typeorm/entities/Teste';
import { TesteRepository } from '../typeorm/repositories/TestesRepository';

interface IRequest {
  id: number;
  texto: string;
}

class CriarUfService {
  public async execute({ id, texto }: IRequest): Promise<Teste> {
    const testeRepository = getCustomRepository(TesteRepository);
    const testeExists = await testeRepository.findBySigla(id);

    if (testeExists) {
      throw new AppError('Ja existe um UF com esta SIGLA', 404);
    }

    const teste = testeRepository.create({
      id,
      texto,
    });

    await testeRepository.save(teste);

    return teste;
  }
}

export default CriarUfService;
