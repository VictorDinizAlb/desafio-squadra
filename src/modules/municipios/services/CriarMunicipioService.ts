import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

interface IRequest {
  codigoUF: number;
  nome: string;
  status: number;
}

export default class CriarMunicipioService {
  public async execute({
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio | AppError> {
    const municipioRepository = getCustomRepository(MunicipioRepository);
    const municipioExists = await municipioRepository.procurarPorNome(nome);

    //  ============================ VERIFICAR DEPOIS =====================================

    // if (municipioExists && municipioExists.status !== 2 && municipioExists.nome == nome) {
    //   const err = new AppError('Ja existe um municipio com esta SIGLA', 404);

    //   return err;
    // }

    const municipio = municipioRepository.create({
      codigoUF,
      nome,
      status,
    });

    await municipioRepository.save(municipio);

    return municipio;
  }
}
