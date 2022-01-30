import { getCustomRepository } from 'typeorm';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class DeletarUfService {
  public async execute(CODIGO_UF: number): Promise<boolean> {
    const ufsRepository = getCustomRepository(UfRepository);
    const uf = await ufsRepository.procurarPorCodigo(CODIGO_UF);

    if (!uf || uf.STATUS == 2) {
      return true;
    }

    uf.STATUS = 2;
    await ufsRepository.save(uf);
    return false;
  }
}

export default DeletarUfService;
