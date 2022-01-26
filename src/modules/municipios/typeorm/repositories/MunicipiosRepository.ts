import {EntityRepository, Repository} from "typeorm";
import Municipio from "../entities/Municipio";

@EntityRepository(Municipio)
export class MunicipioRepository extends Repository<Municipio> {
  public async findByName(name: string): Promise<Municipio | undefined>{
    const municipio = this.findOne({
      where: {
        name,
      },
    });

    return municipio;

  }

}
