import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entities/Municipio';

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

}
