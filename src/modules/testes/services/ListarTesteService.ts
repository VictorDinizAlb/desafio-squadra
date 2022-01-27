import { getCustomRepository } from 'typeorm';
import Teste from '../typeorm/entities/Teste';
import { TesteRepository } from '../typeorm/repositories/TestesRepository';

class ListarTesteService {
  public async execute(): Promise<Teste[] | undefined> {
    const testesRepository = getCustomRepository(TesteRepository);

    const testes = await testesRepository.find();

    return testes;
  }
}

export default ListarTesteService;
