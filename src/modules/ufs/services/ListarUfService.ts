import { getCustomRepository } from 'typeorm';
import Uf from '@modules/ufs/typeorm/entities/Uf';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class ListarUfService {
  public async execute(): Promise<Uf | Uf[]> {
    const ufsRepository = getCustomRepository(UfRepository);

    const ufs = await ufsRepository.find({
      order: {
        nome: 'ASC',
      },
    });

    return ufs;
  }
}

export default ListarUfService;
