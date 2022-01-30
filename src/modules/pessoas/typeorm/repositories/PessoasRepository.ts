import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../entities/Pessoa';
// import PessoaTratado from '../entities/PessoaTratado';

@EntityRepository(Pessoa)
export class PessoaRepository extends Repository<Pessoa> {
  public async procurarPorCodigo(
    CODIGO_PESSOA: number,
  ): Promise<Pessoa | undefined> {
    const pessoa = this.findOne({
      where: {
        CODIGO_PESSOA,
      },
    });

    return pessoa;
  }

  public async buscarSequence(): Promise<number> {
    const nextVal = await this.query(
      `select SEQUENCE_PESSOA.NEXTVAL as id from dual`,
    );
    const id = parseInt(nextVal[0].ID);

    return id;
  }

  // public trataResponse(resultado: Bairro | Bairro[]) {
  //   let linha = 0;
  //   const listaBairros = [];

  //   if (resultado instanceof Bairro) {
  //     const { CODIGO_BAIRRO, CODIGO_MUNICIPIO, NOME, STATUS } = resultado;

  //     const municipioAtual = new BairroTratado(
  //       CODIGO_BAIRRO,
  //       CODIGO_MUNICIPIO,
  //       NOME,
  //       STATUS,
  //     );

  //     return municipioAtual;
  //   } else {
  //     while (linha < resultado.length) {
  //       const { CODIGO_BAIRRO, CODIGO_MUNICIPIO, NOME, STATUS } =
  //         resultado[linha];

  //       const municipioAtual = new BairroTratado(
  //         CODIGO_BAIRRO,
  //         CODIGO_MUNICIPIO,
  //         NOME,
  //         STATUS,
  //       );

  //       listaBairros.push(municipioAtual);

  //       linha++;
  //     }

  //     return listaBairros;
  //   }
  // }
}
