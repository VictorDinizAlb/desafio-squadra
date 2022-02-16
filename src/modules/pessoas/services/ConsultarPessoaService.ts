import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

export default class ConsultarPessoaService {
  public async procurarPorCodigo(
    codigoPessoa: any,
  ): Promise<Pessoa | AppError> {
    const pessoasRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoasRepository.procurarPorCodigo(codigoPessoa);

    if (!pessoa) {
      const erro = new AppError('Nao existe nenhum pessoa com este codigo.');
      return erro;
    }

    return pessoa;

  }
}
