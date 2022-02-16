import { PessoaRepository } from '@modules/pessoas/typeorm/repositories/PessoasRepository';
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
  ): Promise<Endereco | number> {
    const enderecoRepository = getCustomRepository(EnderecoRepository);
    const pessoaRepository = getCustomRepository(PessoaRepository);

    const pessoa = await pessoaRepository.findOne({
      order: { codigoPessoa: 'DESC' }
    });

    if(pessoa == undefined){
      return 0;
    }

    const codigoPessoa = pessoa.codigoPessoa;

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

  public async executeComPessoa(
    codigoBairro: number,
    nomeRua: string,
    numero: string,
    complemento: string,
    cep: string,
    codigoPessoa: number
  ): Promise<Endereco | number> {
    const enderecoRepository = getCustomRepository(EnderecoRepository);

    const endereco = enderecoRepository.create({
      codigoPessoa,
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep
    });

    await enderecoRepository.save(endereco);

    return endereco;
  }
}
