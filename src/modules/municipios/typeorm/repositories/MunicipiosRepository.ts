import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entities/Municipio';
import MunicipioTratado from '../entities/MunicipioTratado';

@EntityRepository(Municipio)
export class MunicipioRepository extends Repository<Municipio> {
  public async procurarPorCodigo(CODIGO_MUNICIPIO: number): Promise<Municipio | undefined> {
    const municipio = this.findOne({
      where: {
        CODIGO_MUNICIPIO,
      },
    });

    return municipio;
  }

  public async procurarPorCodigoUF(CODIGO_UF: number): Promise<Municipio | Municipio[] | undefined> {
    const municipios = this.findOne({
      where: {
        CODIGO_UF,
      },
    });

    return municipios;
  }

  public async procurarPorNome(NOME: string): Promise<Municipio | Municipio[] | undefined> {
    const municipios = this.findOne({
      where: {
        NOME,
      },
    });

    return municipios;
  }

  public async buscarSequence(): Promise<any> {
    const nextVal = await this.query(
      `select SEQUENCE_MUNICIPIO.NEXTVAL as id from dual`,
    );
    const id = nextVal[0].ID;

    return id;
  }

  public trataResponse(resultado: Municipio | Municipio[]){

    let linha = 0;
    let listaMunicipios = [];

    if(resultado instanceof Municipio){
      const { CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS } = resultado;

      let municipioAtual = new MunicipioTratado();

      municipioAtual = {
        codigoMunicipio: CODIGO_MUNICIPIO,
        codigoUF: CODIGO_UF,
        nome: NOME,
        status: STATUS
      };

      return municipioAtual;
    } else {

      while(linha < resultado.length){

        const { CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS } = resultado[linha];

        let municipioAtual = new MunicipioTratado();

        municipioAtual = {
          codigoMunicipio: CODIGO_MUNICIPIO,
          codigoUF: CODIGO_UF,
          nome: NOME,
          status: STATUS
        };

        listaMunicipios.push(municipioAtual);

        linha++;
      }

      return listaMunicipios;
    }
  }
}
