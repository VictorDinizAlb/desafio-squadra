import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

class ListarMunicipioService {
  public async execute(): Promise<Municipio | Municipio[]> {
    const municipioRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipioRepository.find({
      order: {
        nome: 'ASC',
      },
    });

    return municipio;
  }
}

export default ListarMunicipioService;
