import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosRepository';

export default class CriarEnderecoService {
  public async execute(
    codigoBairro: number,
    nomeRua: string,
    numero: string,
    complemento: string,
    cep: string,
    codigoPessoa: number,
  ): Promise<Endereco> {
    const enderecoRepository = getCustomRepository(EnderecoRepository);


    const endereco = enderecoRepository.create({
      codigoPessoa,
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
    });

    await enderecoRepository.save(endereco);

    return endereco;
  }
}
