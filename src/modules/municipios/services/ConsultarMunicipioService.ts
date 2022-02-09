import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

class ConsultarMunicipioService {
  public async procurarPorCodigo(
    codigoMunicipio: any,
  ): Promise<Municipio | Municipio[] | boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigo(
      codigoMunicipio,
    );

    if (!municipio) {
      return false;
    }

    return municipio;
  }

  public async procurarPorNome(
    nome: string,
  ): Promise<Municipio | Municipio[] | boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorNome(nome);

    if (!municipio) {
      return false;
    }

    return municipio;
  }

  public async procurarPorCodigoUF(
    codigoUF: any,
  ): Promise<Municipio | Municipio[] | boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigoUF(codigoUF);

    if (municipio == undefined) {
      return false;
    }

    return municipio;
  }
}

export default ConsultarMunicipioService;
