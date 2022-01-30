import { getCustomRepository } from 'typeorm';
import UfTratado from '@modules/ufs/typeorm/entities/UfTratado';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class ListarUfService {
  public async execute(): Promise<UfTratado | UfTratado[]> {
    const ufsRepository = getCustomRepository(UfRepository);

    const ufs = await ufsRepository.find({
      order: {
          NOME: "ASC",
      },
    });
    const ufsTratados = ufsRepository.trataResponse(ufs);

    return ufsTratados;
  }
}

export default ListarUfService;
