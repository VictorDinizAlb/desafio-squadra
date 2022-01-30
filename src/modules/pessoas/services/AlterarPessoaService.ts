import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';

interface IRequest {
  CODIGO_PESSOA: number;
  NOME: string;
  SOBRENOME: string;
  IDADE: number;
  LOGIN: string;
  SENHA: string;
  STATUS: number;
}

export default class AlterarPessoaService {
  public async execute({
    CODIGO_PESSOA,
    NOME,
    SOBRENOME,
    IDADE,
    LOGIN,
    SENHA,
    STATUS,
  }: IRequest): Promise<Pessoa> {
    const pessoasRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoasRepository.procurarPorCodigo(CODIGO_PESSOA);

    if (!pessoa) {
      throw new AppError('pessoa not found.');
    }

    pessoa.NOME = NOME;
    pessoa.SOBRENOME = SOBRENOME;
    pessoa.IDADE = IDADE;
    pessoa.LOGIN = LOGIN;
    pessoa.SENHA = SENHA;
    pessoa.STATUS = STATUS;

    await pessoasRepository.save(pessoa);

    return pessoa;
  }
}
