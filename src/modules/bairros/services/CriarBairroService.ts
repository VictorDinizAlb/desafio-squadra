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
    const bairroExists = await bairroRepository.procurarPorNome(NOME);

    //  ============================ VERIFICAR DEPOIS =====================================

    // if (bairroExists && bairroExists.STATUS !== 2 && bairroExists.NOME == NOME) {
    //   const err = new AppError('Ja existe um bairro com esta SIGLA', 404);

    //   return err;
    // }

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
