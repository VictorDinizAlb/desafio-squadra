import { getCustomRepository } from 'typeorm';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

export default class DeletarPessoaService {
  public async execute(codigoPessoa: number): Promise<boolean> {
    const pessoasRepository = getCustomRepository(PessoaRepository);
    const pessoa = await pessoasRepository.procurarPorCodigo(codigoPessoa);

    if (!pessoa || pessoa.status == 2) {
      return true;
    }

    pessoa.status = 2;
    await pessoasRepository.save(pessoa);
    return false;
  }
}
