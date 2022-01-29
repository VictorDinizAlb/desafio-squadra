import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

interface IRequest {
  CODIGO_BAIRRO: number;
  CODIGO_MUNICIPIO: number;
  NOME: string;
  STATUS: number;
}

export default class AlterarBairroService {
  public async execute({
    CODIGO_BAIRRO,
    CODIGO_MUNICIPIO,
    NOME,
    STATUS,
  }: IRequest): Promise<Bairro> {
    const bairrosRepository = getCustomRepository(BairroRepository);

    const bairro = await bairrosRepository.procurarPorCodigo(CODIGO_BAIRRO);

    if (!bairro) {
      throw new AppError('bairro not found.');
    }

    const bairroExists = await bairrosRepository.procurarPorNome(NOME);

    if (bairroExists && NOME !== bairro.NOME) {
      throw new AppError('There is already one bairro with this NOME.');
    }

    bairro.CODIGO_MUNICIPIO = CODIGO_MUNICIPIO;
    bairro.NOME = NOME;
    bairro.STATUS = STATUS;

    await bairrosRepository.save(bairro);

    return bairro;
  }
}
