import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
}

export default class CriarBairroService {
  public async execute({
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro | AppError> {
    const bairroRepository = getCustomRepository(BairroRepository);

    const bairro = bairroRepository.create({
      codigoMunicipio,
      nome,
      status,
    });

    await bairroRepository.save(bairro);

    return bairro;
  }
}
