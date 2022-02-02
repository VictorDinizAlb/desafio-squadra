import { getCustomRepository } from 'typeorm';
import MunicipioTratado from '../typeorm/entities/MunicipioTratado';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

class ListarMunicipioService {
  public async execute(): Promise<MunicipioTratado | MunicipioTratado[]> {
    const municipioRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipioRepository.find({
      order: {
        NOME: 'ASC',
      },
    });
    const municipioTratados = municipioRepository.trataResponse(municipio);

    return municipioTratados;
  }
}

export default ListarMunicipioService;
