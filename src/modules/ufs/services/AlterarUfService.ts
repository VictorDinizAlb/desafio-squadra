import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

interface IRequest {
  CODIGO_UF: number;
  SIGLA: string;
  NOME: string;
  STATUS: number;
}

export default class AlterarUfService {
  public async execute({
    CODIGO_UF,
    SIGLA,
    NOME,
    STATUS,
  }: IRequest): Promise<Uf | boolean> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.procurarPorCodigo(CODIGO_UF);

    if (!uf) {
      return true;
    }

    const ufExists = await ufsRepository.procurarPorNome(NOME);

    if (ufExists && NOME !== uf.NOME) {
      throw new AppError('There is already one uf with this NOME.');
    }

    uf.NOME = NOME;
    uf.SIGLA = SIGLA;
    uf.STATUS = STATUS;

    await ufsRepository.save(uf);

    return uf;
  }
}
