import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import MunicipioTratado from '../typeorm/entities/MunicipioTratado';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

class ConsultarMunicipioService {
  public async procurarPorCodigo(
    CODIGO_MUNICIPIO: any,
  ): Promise<MunicipioTratado | MunicipioTratado[] | boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigo(
      CODIGO_MUNICIPIO,
    );

    if (!municipio) {
      return false;
    }

    const municipiosTratados = municipiosRepository.trataResponse(municipio);

    return municipiosTratados;
  }

  public async procurarPorNome(
    NOME: string,
  ): Promise<MunicipioTratado | MunicipioTratado[] | boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorNome(NOME);

    if (!municipio) {
      return false;
    }

    const municipiosTratados = municipiosRepository.trataResponse(municipio);

    return municipiosTratados;
  }

  public async procurarPorCodigoUF(
    CODIGO_UF: any,
  ): Promise<MunicipioTratado | MunicipioTratado[] | boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigoUF(CODIGO_UF);

    if (municipio == undefined) {
      return false;
    }

    const municipiosTratados = municipiosRepository.trataResponse(municipio);

    return municipiosTratados;
  }
}

export default ConsultarMunicipioService;
