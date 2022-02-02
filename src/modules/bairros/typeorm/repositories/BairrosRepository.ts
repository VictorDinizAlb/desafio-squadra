import MunicipioTratado from '@modules/municipios/typeorm/entities/MunicipioTratado';
import { EntityRepository, Repository } from 'typeorm';
import Bairro from '../entities/Bairro';
import BairroTratado from '../entities/BairroTratado';

@EntityRepository(Bairro)
export class BairroRepository extends Repository<Bairro> {
  public async procurarPorCodigo(
    CODIGO_BAIRRO: number,
  ): Promise<Bairro | undefined> {
    const bairro = this.findOne({
      where: {
        CODIGO_BAIRRO,
      },
    });

    return bairro;
  }

  public async procurarPorCodigoMunicipio(
    CODIGO_MUNICIPIO: number,
  ): Promise<Bairro | Bairro[] | undefined> {
    const bairros = this.find({
      where: {
        CODIGO_MUNICIPIO,
      },
    });

    return bairros;
  }

  public async procurarPorNome(
    NOME: string,
  ): Promise<Bairro | Bairro[] | undefined> {
    const bairros = this.find({
      where: {
        NOME,
      },
    });

    return bairros;
  }

  public async buscarSequence(): Promise<number> {
    const nextVal = await this.query(
      `select SEQUENCE_BAIRRO.NEXTVAL as id from dual`,
    );
    const id = parseInt(nextVal[0].ID);

    return id;
  }

  public trataResponse(
    resultado: Bairro | Bairro[],
    municipio?: MunicipioTratado,
  ) {
    let linha = 0;
    const listaBairros = [];

    if (resultado instanceof Bairro) {
      const { CODIGO_BAIRRO, CODIGO_MUNICIPIO, NOME, STATUS } = resultado;

      const municipioAtual = new BairroTratado(
        CODIGO_BAIRRO,
        CODIGO_MUNICIPIO,
        NOME,
        STATUS,
        municipio,
      );

      return municipioAtual;
    } else {
      while (linha < resultado.length) {
        const { CODIGO_BAIRRO, CODIGO_MUNICIPIO, NOME, STATUS } =
          resultado[linha];

        const municipioAtual = new BairroTratado(
          CODIGO_BAIRRO,
          CODIGO_MUNICIPIO,
          NOME,
          STATUS,
        );

        listaBairros.push(municipioAtual);

        linha++;
      }

      return listaBairros;
    }
  }
}
