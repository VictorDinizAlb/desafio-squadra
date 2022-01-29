import { getCustomRepository } from 'typeorm';
import UfTratado from '../typeorm/entities/UfTratado';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class ListarUfService {
  public async execute(): Promise<UfTratado | UfTratado[]> {
    const ufsRepository = getCustomRepository(UfRepository);

    const ufs = await ufsRepository.find();
    const ufsTratados = ufsRepository.trataResponse(ufs);

    return ufsTratados;
  }
}

export default ListarUfService;
