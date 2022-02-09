import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

export default class ConsultarBairroService {
  public async procurarPorCodigo(
    codigoBairro: any,
  ): Promise<Bairro | Bairro[] | boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);

    const bairro = await bairrosRepository.procurarPorCodigo(codigoBairro);

    if (!bairro) {
      return false;
    }

    return bairro;
  }

  public async procurarPorNome(
    nome: string,
  ): Promise<Bairro | Bairro[] | boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);

    const bairro = await bairrosRepository.procurarPorNome(nome);

    if (!bairro || bairro == undefined) {
      return false;
    }

    return bairro;
  }

  public async procurarPorCodigoMunicipio(
    codigoMunicipio: any,
  ): Promise<Bairro | Bairro[] | boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);

    const bairros = await bairrosRepository.procurarPorCodigoMunicipio(
      codigoMunicipio,
    );

    if (!bairros) {
      return false;
    }

    return bairros;
  }
}
