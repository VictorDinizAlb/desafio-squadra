import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entities/Uf';

@EntityRepository(Uf)
export class UfRepository extends Repository<Uf> {
  public async procurarPorCodigo(CODIGO_UF: number): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        CODIGO_UF,
      },
    });

    return uf;
  }

  public async procurarPorSigla(SIGLA: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        SIGLA,
      },
    });

    return uf;
  }

  public async procurarPorNome(NOME: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        NOME,
      },
    });

    return uf;
  }

  public async buscarSequence(): Promise<any> {
    const nextVal = await this.query(
      `select SEQUENCE_UF.NEXTVAL as id from dual`,
    );
    const id = nextVal[0].ID;

    return id;
  }
}
