import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosRepository';

interface IRequest {
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}

export default class CriarEnderecoService {
  public async execute({
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
  }: IRequest, CODIGO_PESSOA: number): Promise<Endereco> {
    const enderecoRepository = getCustomRepository(EnderecoRepository);
    const CODIGO_BAIRRO = codigoBairro;
    const NOME_RUA = nomeRua;
    const NUMERO = numero;
    const COMPLEMENTO = complemento;
    const CEP = cep;

    const CODIGO_ENDERECO = await enderecoRepository.buscarSequence();

    const endereco = enderecoRepository.create({
      CODIGO_ENDERECO,
      CODIGO_PESSOA,
      CODIGO_BAIRRO,
      NOME_RUA,
      NUMERO,
      COMPLEMENTO,
      CEP,
    });

    await enderecoRepository.save(endereco);

    return endereco;
  }

  // public async recebeDados(dadosEndereco[]: Array) {

  // }
}
