import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
// import PessoaTratado from '../typeorm/entities/PessoaTratado';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

export default class ConsultarPessoaService {
  public async procurarPorCodigo(
    CODIGO_PESSOA: any,
  ): Promise<Pessoa | Pessoa[] | AppError> {
    const pessoasRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoasRepository.procurarPorCodigo(CODIGO_PESSOA);

    if (!pessoa) {
      const erro = new AppError('Nao existe nenhum pessoa com este codigo.')
      return erro;
    }

    // const pessoasTratados = pessoasRepository.trataResponse(pessoa);

    return pessoa;
  }

}
