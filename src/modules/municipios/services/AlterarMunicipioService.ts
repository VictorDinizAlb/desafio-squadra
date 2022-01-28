import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

interface IRequest {
  CODIGO_MUNICIPIO: number;
  CODIGO_UF: number;
  NOME: string;
  STATUS: number;
}

export default class AlterarMunicipioService {
  public async execute({
    CODIGO_MUNICIPIO,
    CODIGO_UF,
    NOME,
    STATUS,
  }: IRequest): Promise<Municipio> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigo(CODIGO_MUNICIPIO);

    if (!municipio) {
      throw new AppError('municipio not found.');
    }

    const municipioExists = await municipiosRepository.procurarPorNome(NOME);

    if (municipioExists && NOME !== municipio.NOME) {
      throw new AppError('There is already one municipio with this NOME.');
    }

    municipio.CODIGO_UF = CODIGO_UF;
    municipio.NOME = NOME;
    municipio.STATUS = STATUS;

    await municipiosRepository.save(municipio);

    return municipio;
  }
}
