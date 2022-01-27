import { EntityRepository, Repository } from 'typeorm';
import Teste from '../entities/Teste';

@EntityRepository(Teste)
export class TesteRepository extends Repository<Teste> {
  public async findBySigla(id: number): Promise<Teste | undefined> {
    const teste = this.findOne({
      where: {
        id,
      },
    });

    return teste;
  }
}
