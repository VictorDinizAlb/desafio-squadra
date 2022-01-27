import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entities/Uf';

@EntityRepository(Uf)
export class UfRepository extends Repository<Uf> {
  public async procurarPorSigla(SIGLA: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        SIGLA,
      },
    });

    return uf;
  }

  public async procurarPorCodigo(codigoUF: number): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        codigoUF,
      },
    });

    return uf;
  }
}
