import MunicipioTratado from '@modules/municipios/typeorm/entities/MunicipioTratado';
import { EntityRepository, Repository } from 'typeorm';
import Bairro from '../entities/Bairro';
import BairroTratado from '../entities/BairroTratado';

@EntityRepository(Bairro)
export class BairroRepository extends Repository<Bairro> {
  public async procurarPorCodigo(
    codigoBairro: number,
  ): Promise<Bairro | undefined> {
    const bairro = this.findOne({
      where: {
        codigoBairro,
      },
    });

    return bairro;
  }

  public async procurarPorCodigoMunicipio(
    codigoMunicipio: number,
  ): Promise<Bairro | Bairro[] | undefined> {
    const bairros = this.find({
      where: {
        codigoMunicipio,
      },
    });

    return bairros;
  }

  public async procurarPorNome(
    nome: string,
  ): Promise<Bairro | Bairro[] | undefined> {
    const bairros = this.find({
      where: {
        nome,
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
      const { codigoBairro, codigoMunicipio, nome, status } = resultado;

      const municipioAtual = new BairroTratado(
        codigoBairro,
        codigoMunicipio,
        nome,
        status,
        municipio,
      );

      return municipioAtual;
    } else {
      while (linha < resultado.length) {
        const { codigoBairro, codigoMunicipio, nome, status } =
          resultado[linha];

        const municipioAtual = new BairroTratado(
          codigoBairro,
          codigoMunicipio,
          nome,
          status,
        );

        listaBairros.push(municipioAtual);

        linha++;
      }

      return listaBairros;
    }
  }
}
