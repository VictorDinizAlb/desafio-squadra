import PessoaTratadoPessoa from '@shared/classesTratadas/PessoaTratadoPessoa';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PessoaTratado from '../typeorm/entities/PessoaTratado';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

export default class ConsultarPessoaService {
  public async procurarPorCodigo(
    CODIGO_PESSOA: any,
  ): Promise<PessoaTratadoPessoa | AppError> {
    const pessoasRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoasRepository.procurarPorCodigo(CODIGO_PESSOA);

    if (!pessoa) {
      const erro = new AppError('Nao existe nenhum pessoa com este codigo.');
      return erro;
    }

    const pessoaTratado = pessoasRepository.trataResponse(pessoa);

    if (pessoaTratado instanceof PessoaTratado) {
      const pessoaCompleto = pessoasRepository.adicionaEndereco(pessoaTratado);
      return pessoaCompleto;
    } else {
      const erro = new AppError('Nao existe nenhum pessoa com este codigo.');
      return erro;
    }
  }
}
