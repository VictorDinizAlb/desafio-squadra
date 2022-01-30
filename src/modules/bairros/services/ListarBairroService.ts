import { getCustomRepository } from 'typeorm';
import BairroTratado from '../typeorm/entities/BairroTratado';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

class ListarBairroService {
  public async execute(): Promise<BairroTratado | BairroTratado[]> {
    const bairroRepository = getCustomRepository(BairroRepository);

    const bairro = await bairroRepository.find({
      order: {
          NOME: "ASC",
      },
    });
    const bairroTratados = bairroRepository.trataResponse(bairro);

    return bairroTratados;
  }
}

export default ListarBairroService;
