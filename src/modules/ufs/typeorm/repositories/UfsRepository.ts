import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entities/Uf';
import UfTratado from '../entities/UfTratado';

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

  public trataResponse(resultado: Uf | Uf[]) {
    let linha = 0;
    const listaUfs = [];

    if (resultado instanceof Uf) {
      const { CODIGO_UF, SIGLA, NOME, STATUS } = resultado;

      let ufAtual = new UfTratado();

      ufAtual = {
        codigoUF: CODIGO_UF,
        sigla: SIGLA,
        nome: NOME,
        status: STATUS,
      };

      return ufAtual;
    } else {
      while (linha < resultado.length) {
        const { CODIGO_UF, SIGLA, NOME, STATUS } = resultado[linha];

        let ufAtual = new UfTratado();

        ufAtual = {
          codigoUF: CODIGO_UF,
          sigla: SIGLA,
          nome: NOME,
          status: STATUS,
        };

        listaUfs.push(ufAtual);

        linha++;
      }

      return listaUfs;
    }
  }
}
