import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import BairroTratado from '../typeorm/entities/BairroTratado';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

export default class ConsultarBairroService {
  public async procurarPorCodigo(
    CODIGO_BAIRRO: any,
  ): Promise<BairroTratado | BairroTratado[] | boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);

    const bairro = await bairrosRepository.procurarPorCodigo(CODIGO_BAIRRO);

    if (!bairro) {
      return false;
    }

    const bairrosTratados = bairrosRepository.trataResponse(bairro);

    return bairrosTratados;
  }

  public async procurarPorNome(
    NOME: string,
  ): Promise<BairroTratado | BairroTratado[] | boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);

    const bairro = await bairrosRepository.procurarPorNome(NOME);

    if (!bairro || bairro == undefined) {
      return false;
    }

    const bairrosTratados = bairrosRepository.trataResponse(bairro);

    return bairrosTratados;
  }

  public async procurarPorCodigoMunicipio(
    CODIGO_MUNICIPIO: any,
  ): Promise<BairroTratado | BairroTratado[] | boolean> {
    const municipiosRepository = getCustomRepository(BairroRepository);

    const municipio = await municipiosRepository.procurarPorCodigoMunicipio(
      CODIGO_MUNICIPIO,
    );

    if (!municipio) {
      return false;
    }

    const municipiosTratados = municipiosRepository.trataResponse(municipio);

    return municipiosTratados;
  }
}
