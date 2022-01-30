import { getCustomRepository } from 'typeorm';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

class DeletarPessoaService {
  public async execute(CODIGO_PESSOA: number): Promise<boolean> {
    const pessoasRepository = getCustomRepository(PessoaRepository);
    const pessoa = await pessoasRepository.procurarPorCodigo(CODIGO_PESSOA);

    if (!pessoa || pessoa.STATUS == 2) {
      return true;
    }

    pessoa.STATUS = 2;
    await pessoasRepository.save(pessoa);
    return false;
  }
}

export default DeletarPessoaService;
