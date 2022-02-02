import { EnderecoRepository } from '@modules/enderecos/typeorm/repositories/EnderecosRepository';
import { getCustomRepository } from 'typeorm';
import CriarEnderecoService from './CriarEnderecoService';

export default class AlterarPessoaService {
  public async execute(enderecosNovos: Array<any>, codigoPessoa: number) {
    const enderecoRepository = getCustomRepository(EnderecoRepository);
    const criarEndereco = new CriarEnderecoService();
    const enderecosAtuais = await enderecoRepository.procurarPorCodigoPessoa(
      codigoPessoa,
    );

    if (enderecosAtuais.length > 0) {
      for (let i = 0; i < enderecosAtuais.length; i++) {
        for (let j = 0; j < enderecosNovos.length; j++) {
          if (
            enderecosAtuais[i].CODIGO_ENDERECO ==
              enderecosNovos[j].codigoEndereco &&
            enderecosNovos[j].codigoEndereco !== undefined
          ) {
            enderecosAtuais[i].CODIGO_BAIRRO = enderecosNovos[j].codigoBairro;
            enderecosAtuais[i].COMPLEMENTO = enderecosNovos[j].complemento;
            enderecosAtuais[i].NOME_RUA = enderecosNovos[j].nomeRua;
            enderecosAtuais[i].NUMERO = enderecosNovos[j].numero;
            enderecosAtuais[i].CEP = enderecosNovos[j].cep;

            await enderecoRepository.save(enderecosAtuais[i]);

            enderecosAtuais[i].CODIGO_ENDERECO = 0;
          }
        }
      }

      for (let i = 0; i < enderecosAtuais.length; i++) {
        if (enderecosAtuais[i].CODIGO_ENDERECO !== 0) {
          await enderecoRepository.remove(enderecosAtuais[i]);
        }
      }

      for (let i = 0; i < enderecosNovos.length; i++) {
        if (!enderecosNovos[i].codigoEndereco) {
          const { codigoBairro, nomeRua, numero, complemento, cep } =
            enderecosNovos[i];

          await criarEndereco.execute(
            codigoBairro,
            nomeRua,
            numero,
            complemento,
            cep,
            codigoPessoa,
          );
        }
      }
    } else {
      for (let i = 0; i < enderecosNovos.length; i++) {
        const { codigoBairro, nomeRua, numero, complemento, cep } =
          enderecosNovos[i];

        await criarEndereco.execute(
          codigoBairro,
          nomeRua,
          numero,
          complemento,
          cep,
          codigoPessoa,
        );
      }
    }
  }
}
