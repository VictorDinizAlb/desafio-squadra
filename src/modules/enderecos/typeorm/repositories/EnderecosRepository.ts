import BairroTratado from '@modules/bairros/typeorm/entities/BairroTratado';
import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entities/Endereco';
import EnderecoTratado from '../entities/EnderecoTratado';

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {

  public async procurarPorCodigoPessoa(
    codigoPessoa: number,
  ): Promise<Endereco[]> {
    const CODIGO_PESSOA = codigoPessoa;

    const enderecos = this.find({
      where: {
        CODIGO_PESSOA,
      },
      order: {
        CODIGO_ENDERECO: "ASC"
      }
    });

    return enderecos;
  }

  public async buscarSequence(): Promise<number> {
    const nextVal = await this.query(
      `select SEQUENCE_ENDERECO.NEXTVAL as id from dual`,
    );
    const id = parseInt(nextVal[0].ID);

    return id;
  }

  public trataResponse(resultado: Endereco | Endereco[], bairro?: BairroTratado) {
    let linha = 0;
    const listaEnderecos = [];

    if (resultado instanceof Endereco) {
      const { CODIGO_ENDERECO, CODIGO_BAIRRO, CODIGO_PESSOA, NOME_RUA, NUMERO, COMPLEMENTO, CEP } = resultado;

      const enderecoTratado = new EnderecoTratado(
        CODIGO_ENDERECO,
        CODIGO_BAIRRO,
        CODIGO_PESSOA,
        NOME_RUA,
        NUMERO,
        COMPLEMENTO,
        CEP,
        bairro
      );

      return enderecoTratado;
    } else {
      while (linha < resultado.length) {
        const { CODIGO_ENDERECO, CODIGO_BAIRRO, CODIGO_PESSOA, NOME_RUA, NUMERO, COMPLEMENTO, CEP } =
        resultado[linha];
      const enderecoTratado = new EnderecoTratado(
        CODIGO_ENDERECO,
        CODIGO_BAIRRO,
        CODIGO_PESSOA,
        NOME_RUA,
        NUMERO,
        COMPLEMENTO,
        CEP,
        bairro
      );

        listaEnderecos.push(enderecoTratado);

        linha++;
      }

      return listaEnderecos;
    }
  }
}
