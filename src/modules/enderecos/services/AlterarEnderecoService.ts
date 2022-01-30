import { EnderecoRepository } from '@modules/enderecos/typeorm/repositories/EnderecosRepository';
import { getCustomRepository } from 'typeorm';
import CriarEnderecoService from './CriarEnderecoService';



export default class AlterarPessoaService {
  public async execute(enderecosNovos: Array<any>, codigoPessoa: number) {
    const enderecoRepository = getCustomRepository(EnderecoRepository);
    const criarEndereco = new CriarEnderecoService();
    const enderecosAtuais = await enderecoRepository.procurarPorCodigoPessoa(codigoPessoa);
    var tamAtual = enderecosAtuais.length;

    if (enderecosAtuais !== undefined && tamAtual !== 0) {

      for (let i = 0; i < enderecosAtuais.length; i++){

        if (!enderecosNovos[i]) {
          enderecoRepository.remove(enderecosAtuais[i])
        } else {
          enderecosAtuais[i].CODIGO_BAIRRO = enderecosNovos[i].codigoBairro;
          enderecosAtuais[i].COMPLEMENTO = enderecosNovos[i].complemento;
          enderecosAtuais[i].NOME_RUA = enderecosNovos[i].nomeRua;
          enderecosAtuais[i].NUMERO = enderecosNovos[i].numero;
          enderecosAtuais[i].CEP = enderecosNovos[i].cep;

          await enderecoRepository.save(enderecosAtuais[i]);
        }

      }
    } else {
      for (let i = 0; i < enderecosNovos.length; i++){
        const { codigoBairro, nomeRua, numero, complemento, cep } = enderecosNovos[i];

        await criarEndereco.execute(codigoBairro, nomeRua, numero, complemento, cep, codigoPessoa);

        return;
      }
    }

    for (let i = 0; i < (enderecosNovos.length - tamAtual); i++){
      const { codigoBairro, nomeRua, numero, complemento, cep } = enderecosNovos[tamAtual++];

      await criarEndereco.execute(codigoBairro, nomeRua, numero, complemento, cep, codigoPessoa);
    }
  }

}
