import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class ListarUfService {
  public async execute(): Promise<Uf[] | undefined> {
    const ufsRepository = getCustomRepository(UfRepository);

    const ufs = await ufsRepository.find();

    return ufs;
  }
}

export default ListarUfService;
