import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

class ListarPessoaService {
  public async execute(): Promise<Pessoa | Pessoa[]> {
    const pessoaRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoaRepository.find({
      order: {
        nome: 'ASC',
      },
    });

    return pessoa;
  }
}

export default ListarPessoaService;
