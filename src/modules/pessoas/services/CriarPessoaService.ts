import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';
import { EnderecoRepository } from 'src/modules/enderecos/typeorm/repositories/EnderecosRepository';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

export default class CriarPessoaService {
  public async execute({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: IRequest): Promise<Pessoa | AppError> {
    const pessoaRepository = getCustomRepository(PessoaRepository);

    const pessoa = pessoaRepository.create({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    await pessoaRepository.save(pessoa);

    return pessoa;
  }
}
