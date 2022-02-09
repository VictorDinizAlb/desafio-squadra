import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

class ListarBairroService {
  public async execute(): Promise<Bairro | Bairro[]> {
    const bairroRepository = getCustomRepository(BairroRepository);

    const bairro = await bairroRepository.find({
      order: {
        nome: 'ASC',
      },
    });

    return bairro;
  }
}

export default ListarBairroService;
