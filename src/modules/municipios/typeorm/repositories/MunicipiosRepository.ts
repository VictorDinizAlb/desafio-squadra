import UfTratado from '@modules/ufs/typeorm/entities/UfTratado';
import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entities/Municipio';
import MunicipioTratado from '../entities/MunicipioTratado';

@EntityRepository(Municipio)
export class MunicipioRepository extends Repository<Municipio> {
  public async procurarPorCodigo(
    CODIGO_MUNICIPIO: number,
  ): Promise<Municipio | undefined> {
    const municipio = this.findOne({
      where: {
        CODIGO_MUNICIPIO,
      },
    });

    return municipio;
  }

  public async procurarPorCodigoUF(
    CODIGO_UF: number,
  ): Promise<Municipio | Municipio[] | undefined> {
    const municipios = this.find({
      where: {
        CODIGO_UF,
      },
    });

    return municipios;
  }

  public async procurarPorNome(
    NOME: string,
  ): Promise<Municipio | Municipio[] | undefined> {
    const municipios = this.findOne({
      where: {
        NOME,
      },
    });

    return municipios;
  }

  public async buscarSequence(): Promise<number> {
    const nextVal = await this.query(
      `select SEQUENCE_MUNICIPIO.NEXTVAL as id from dual`,
    );
    const id = parseInt(nextVal[0].ID);

    return id;
  }

  public trataResponse(resultado: Municipio | Municipio[], uf?: UfTratado) {
    let linha = 0;
    const listaMunicipios = [];

    if (resultado instanceof Municipio) {
      const { CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS } = resultado;

      const municipioAtual = new MunicipioTratado(
        CODIGO_MUNICIPIO,
        CODIGO_UF,
        NOME,
        STATUS,
        uf,
      );

      return municipioAtual;
    } else {
      while (linha < resultado.length) {
        const { CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS } = resultado[linha];

        const municipioAtual = new MunicipioTratado(
          CODIGO_MUNICIPIO,
          CODIGO_UF,
          NOME,
          STATUS,
          uf,
        );

        listaMunicipios.push(municipioAtual);

        linha++;
      }

      return listaMunicipios;
    }
  }
}
