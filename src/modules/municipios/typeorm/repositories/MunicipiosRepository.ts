import UfTratado from '@modules/ufs/typeorm/entities/UfTratado';
import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entities/Municipio';
import MunicipioTratado from '../entities/MunicipioTratado';

@EntityRepository(Municipio)
export class MunicipioRepository extends Repository<Municipio> {
  public async procurarPorCodigo(
    codigoMunicipio: number,
  ): Promise<Municipio | undefined> {
    const municipio = this.findOne({
      where: {
        codigoMunicipio,
      },
    });

    return municipio;
  }

  public async procurarPorCodigoUF(
    codigoUF: number,
  ): Promise<Municipio | Municipio[] | undefined> {
    const municipios = this.find({
      where: {
        codigoUF,
      },
    });

    return municipios;
  }

  public async procurarPorNome(
    nome: string,
  ): Promise<Municipio | Municipio[] | undefined> {
    const municipios = this.findOne({
      where: {
        nome,
      },
    });

    return municipios;
  }

  // public async buscarSequence(): Promise<number> {
  //   const nextVal = await this.query(
  //     `select SEQUENCE_MUNICIPIO.NEXTVAL as id from dual`,
  //   );
  //   const id = parseInt(nextVal[0].ID);

  //   return id;
  // }

  public trataResponse(resultado: Municipio | Municipio[], uf?: UfTratado) {
    let linha = 0;
    const listaMunicipios = [];

    if (resultado instanceof Municipio) {
      const { codigoMunicipio, codigoUF, nome, status } = resultado;

      const municipioAtual = new MunicipioTratado(
        codigoMunicipio,
        codigoUF,
        nome,
        status,
        uf,
      );

      return municipioAtual;
    } else {
      while (linha < resultado.length) {
        const { codigoMunicipio, codigoUF, nome, status } = resultado[linha];

        const municipioAtual = new MunicipioTratado(
          codigoMunicipio,
          codigoUF,
          nome,
          status,
          uf,
        );

        listaMunicipios.push(municipioAtual);

        linha++;
      }

      return listaMunicipios;
    }
  }
}
