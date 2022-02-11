import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

export default class AlterarPessoaService {
  public async execute({
    codigoPessoa,
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: IRequest): Promise<Pessoa | boolean> {
    const pessoasRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoasRepository.procurarPorCodigo(codigoPessoa);

    if (!pessoa) {
      return true;
    }

    pessoa.nome = nome;
    pessoa.sobrenome = sobrenome;
    pessoa.idade = idade;
    pessoa.login = login;
    pessoa.senha = senha;
    pessoa.status = status;

    await pessoasRepository.save(pessoa);

    return pessoa;
  }
}
