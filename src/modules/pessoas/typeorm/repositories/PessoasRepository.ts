import MontaEnderecoService from '@modules/enderecos/services/MontaEnderecoService';
import PessoaTratadoPessoa from '@shared/classesTratadas/PessoaTratadoPessoa';
import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../entities/Pessoa';
import PessoaTratado from '../entities/PessoaTratado';

@EntityRepository(Pessoa)
export class PessoaRepository extends Repository<Pessoa> {
  public async procurarPorCodigo(
    CODIGO_PESSOA: number,
  ): Promise<Pessoa | undefined> {
    const pessoa = this.findOne({
      where: {
        CODIGO_PESSOA,
      },
    });

    return pessoa;
  }

  public async buscarSequence(): Promise<number> {
    const nextVal = await this.query(
      `select SEQUENCE_PESSOA.NEXTVAL as id from dual`,
    );
    const id = parseInt(nextVal[0].ID);

    return id;
  }

  public trataResponse(resultado: Pessoa | Pessoa[]) {
    let linha = 0;
    const listaPessoas = [];

    if (resultado instanceof Pessoa) {
      const { CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS } =
        resultado;

      const pessoaAtual = new PessoaTratado(
        CODIGO_PESSOA,
        NOME,
        SOBRENOME,
        IDADE,
        LOGIN,
        SENHA,
        STATUS,
      );

      return pessoaAtual;
    } else {
      while (linha < resultado.length) {
        const { CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS } =
          resultado[linha];

        const pessoaAtual = new PessoaTratado(
          CODIGO_PESSOA,
          NOME,
          SOBRENOME,
          IDADE,
          LOGIN,
          SENHA,
          STATUS,
        );

        listaPessoas.push(pessoaAtual);

        linha++;
      }

      return listaPessoas;
    }
  }

  public async adicionaEndereco(
    pessoa: PessoaTratado,
  ): Promise<PessoaTratadoPessoa> {
    const enderecos = new MontaEnderecoService();
    const enderecosCompletos = await enderecos.execute(pessoa.codigoPessoa);

    const pessoaEndereco = new PessoaTratadoPessoa(pessoa, enderecosCompletos);

    return pessoaEndereco;
  }
}
