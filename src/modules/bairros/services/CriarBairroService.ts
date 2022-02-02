import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

interface IRequest {
  CODIGO_MUNICIPIO: number;
  NOME: string;
  STATUS: number;
}

export default class CriarBairroService {
  public async execute({
    CODIGO_MUNICIPIO,
    NOME,
    STATUS,
  }: IRequest): Promise<Bairro | AppError> {
    const bairroRepository = getCustomRepository(BairroRepository);

    const CODIGO_BAIRRO = await bairroRepository.buscarSequence();

    const bairro = bairroRepository.create({
      CODIGO_BAIRRO,
      CODIGO_MUNICIPIO,
      NOME,
      STATUS,
    });

    await bairroRepository.save(bairro);

    return bairro;
  }
}
