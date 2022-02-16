import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entities/Endereco';

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {
  public async procurarPorCodigoPessoa(
    codigoPessoa: number,
  ): Promise<Endereco[]> {
    const enderecos = this.find({
      where: {
        codigoPessoa,
      },
      order: {
        codigoEndereco: 'ASC',
      },
    });

    return enderecos;
  }

}
