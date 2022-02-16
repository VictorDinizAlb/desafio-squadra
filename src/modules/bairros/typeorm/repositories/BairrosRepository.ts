import { EntityRepository, Repository } from 'typeorm';
import Bairro from '../entities/Bairro';

@EntityRepository(Bairro)
export class BairroRepository extends Repository<Bairro> {
  public async procurarPorCodigo(
    codigoBairro: number,
  ): Promise<Bairro | undefined> {
    const bairro = this.findOne({
      where: {
        codigoBairro,
      },
      relations: ["municipio"],
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

}
