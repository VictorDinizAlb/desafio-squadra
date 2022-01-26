import {EntityRepository, Repository} from "typeorm";
import Uf from "../entities/Uf";

@EntityRepository(Uf)
export class UfRepository extends Repository<Uf> {
  public async findBySigla(sigla: string): Promise<Uf | undefined>{
    const uf = this.findOne({
      where: {
        sigla,
      },
    });

    return uf;

  }

}
