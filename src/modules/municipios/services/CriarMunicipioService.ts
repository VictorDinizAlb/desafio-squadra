import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

interface IRequest {
  CODIGO_UF: number;
  NOME: string;
  STATUS: number;
}

export default class CriarMunicipioService {
  public async execute({
    CODIGO_UF,
    NOME,
    STATUS,
  }: IRequest): Promise<Municipio | AppError> {
    const municipioRepository = getCustomRepository(MunicipioRepository);
    const municipioExists = await municipioRepository.procurarPorNome(NOME);

    //  ============================ VERIFICAR DEPOIS =====================================

    // if (municipioExists && municipioExists.STATUS !== 2 && municipioExists.NOME == NOME) {
    //   const err = new AppError('Ja existe um municipio com esta SIGLA', 404);

    //   return err;
    // }

    const CODIGO_MUNICIPIO = await municipioRepository.buscarSequence();

    const municipio = municipioRepository.create({
      CODIGO_MUNICIPIO,
      CODIGO_UF,
      NOME,
      STATUS,
    });

    await municipioRepository.save(municipio);

    const municipioTratado = municipioRepository.trataResponse(municipio);

    return municipio;
  }
}
