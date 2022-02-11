import PessoaTratadoPessoa from '@shared/classesTratadas/PessoaTratadoPessoa';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

export default class ConsultarPessoaService {
  public async procurarPorCodigo(
    codigoPessoa: any,
  ): Promise<PessoaTratadoPessoa | AppError> {
    const pessoasRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoasRepository.procurarPorCodigo(codigoPessoa);

    if (!pessoa) {
      const erro = new AppError('Nao existe nenhum pessoa com este codigo.');
      return erro;
    }

    // const pessoaTratado = pessoasRepository.trataResponse(pessoa);

    if (pessoa instanceof Pessoa) {
      const pessoaCompleto = pessoasRepository.adicionaEndereco(pessoa);
      return pessoaCompleto;
    } else {
      const erro = new AppError('Nao existe nenhum pessoa com este codigo.');
      return erro;
    }
  }
}
