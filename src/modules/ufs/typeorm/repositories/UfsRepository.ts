import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entities/Uf';
import UfTratado from '../entities/UfTratado';

@EntityRepository(Uf)
export class UfRepository extends Repository<Uf> {
  public async procurarPorCodigo(codigoUF: number): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        codigoUF,
      },
    });

    return uf;
  }

  public async procurarPorSigla(sigla: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        sigla,
      },
    });

    return uf;
  }

  public async procurarPorNome(nome: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: {
        nome,
      },
    });

    return uf;
  }

  public async buscarSequence(): Promise<number> {
    const nextVal = await this.query(
      `select SEQUENCE_UF.NEXTVAL as id from dual`,
    );
    const id = parseInt(nextVal[0].ID);

    return id;
  }

  public trataResponse(resultado: Uf | Uf[]) {
    let linha = 0;
    const listaUfs = [];

    if (resultado instanceof Uf) {
      const { codigoUF, sigla, nome, status } = resultado;

      const ufAtual = new UfTratado(codigoUF, sigla, nome, status);

      return ufAtual;
    } else {
      while (linha < resultado.length) {
        const { codigoUF, sigla, nome, status } = resultado[linha];

        const ufAtual = new UfTratado(codigoUF, sigla, nome, status);

        listaUfs.push(ufAtual);

        linha++;
      }

      return listaUfs;
    }
  }
}
