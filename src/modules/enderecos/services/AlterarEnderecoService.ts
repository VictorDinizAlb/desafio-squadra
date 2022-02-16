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
            enderecosAtuais[i].codigoEndereco ==
              enderecosNovos[j].codigoEndereco &&
            enderecosNovos[j].codigoEndereco !== undefined
          ) {
            enderecosAtuais[i].codigoBairro = enderecosNovos[j].codigoBairro;
            enderecosAtuais[i].complemento = enderecosNovos[j].complemento;
            enderecosAtuais[i].nomeRua = enderecosNovos[j].nomeRua;
            enderecosAtuais[i].numero = enderecosNovos[j].numero;
            enderecosAtuais[i].cep = enderecosNovos[j].cep;

            await enderecoRepository.save(enderecosAtuais[i]);

            enderecosAtuais[i].codigoEndereco = 0;
          }
        }
      }

      for (let i = 0; i < enderecosAtuais.length; i++) {
        if (enderecosAtuais[i].codigoEndereco !== 0) {
          await enderecoRepository.remove(enderecosAtuais[i]);
        }
      }

      for (let i = 0; i < enderecosNovos.length; i++) {
        if (!enderecosNovos[i].codigoEndereco) {
          const { codigoBairro, nomeRua, numero, complemento, cep } =
            enderecosNovos[i];

          await criarEndereco.executeComPessoa(
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

        await criarEndereco.executeComPessoa(
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
