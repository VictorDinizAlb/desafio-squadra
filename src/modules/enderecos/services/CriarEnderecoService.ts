import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosRepository';

export default class CriarEnderecoService {
  public async execute(
    CODIGO_BAIRRO: number,
    NOME_RUA: string,
    NUMERO: string,
    COMPLEMENTO: string,
    CEP: string,
    CODIGO_PESSOA: number): Promise<Endereco> {
    const enderecoRepository = getCustomRepository(EnderecoRepository);

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

}
