import { getCustomRepository } from 'typeorm';
import PessoaTratado from '../typeorm/entities/PessoaTratado';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

class ListarPessoaService {
  public async execute(): Promise<PessoaTratado | PessoaTratado[]> {
    const pessoaRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoaRepository.find({
      order: {
          NOME: "ASC",
      },
    });
    const pessoaTratados = pessoaRepository.trataResponse(pessoa);

    return pessoaTratados;
  }
}

export default ListarPessoaService;