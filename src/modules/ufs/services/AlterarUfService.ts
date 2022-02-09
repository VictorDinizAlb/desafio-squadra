import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}

export default class AlterarUfService {
  public async execute({
    codigoUF,
    sigla,
    nome,
    status,
  }: IRequest): Promise<Uf | boolean> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.procurarPorCodigo(codigoUF);

    if (!uf) {
      return true;
    }

    const ufExists = await ufsRepository.procurarPorNome(nome);

    if (ufExists && nome !== uf.nome) {
      throw new AppError('There is already one uf with this nome.');
    }

    uf.nome = nome;
    uf.sigla = sigla;
    uf.status = status;

    await ufsRepository.save(uf);

    return uf;
  }
}
