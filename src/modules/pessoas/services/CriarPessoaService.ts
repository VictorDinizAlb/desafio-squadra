import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import { PessoaRepository } from '../typeorm/repositories/PessoasRepository';
import { EnderecoRepository } from 'src/modules/enderecos/typeorm/repositories/EnderecosRepository';

interface IRequest {
  NOME: string;
  SOBRENOME: string;
  IDADE: number;
  LOGIN: string;
  SENHA: string;
  STATUS: number;
}

export default class CriarPessoaService {
  public async execute({
    NOME,
    SOBRENOME,
    IDADE,
    LOGIN,
    SENHA,
    STATUS,
  }: IRequest): Promise<Pessoa | AppError> {
    const pessoaRepository = getCustomRepository(PessoaRepository);

    const CODIGO_PESSOA = await pessoaRepository.buscarSequence();

    const pessoa = pessoaRepository.create({
      CODIGO_PESSOA,
      NOME,
      SOBRENOME,
      IDADE,
      LOGIN,
      SENHA,
      STATUS,
    });

    await pessoaRepository.save(pessoa);

    return pessoa;
  }
}
