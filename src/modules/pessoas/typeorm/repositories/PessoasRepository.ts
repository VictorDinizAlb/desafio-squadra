import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../entities/Pessoa';

@EntityRepository(Pessoa)
export class PessoaRepository extends Repository<Pessoa> {
  public async procurarPorCodigo(
    codigoPessoa: number,
  ): Promise<Pessoa | undefined> {
    const pessoa = this.findOne({
      where: {
        codigoPessoa,
      },
      relations: ["enderecos", "enderecos.bairro", "enderecos.bairro.municipio", "enderecos.bairro.municipio.uf"]
    });

    return pessoa;
  }
}
