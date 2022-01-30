import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entities/Endereco';

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {

  public async buscarSequence(): Promise<number> {
    const nextVal = await this.query(
      `select SEQUENCE_ENDERECO.NEXTVAL as id from dual`,
    );
    const id = parseInt(nextVal[0].ID);

    return id;
  }
}
