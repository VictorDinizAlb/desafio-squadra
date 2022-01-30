import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
// import PessoaTratado from '../typeorm/entities/PessoaTratado';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

class ListarPessoaService {
  public async execute(): Promise<Pessoa | Pessoa[]> {
    const pessoaRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoaRepository.find();
    // const pessoaTratados = pessoaRepository.trataResponse(pessoa);

    return pessoa;
  }
}

export default ListarPessoaService;
