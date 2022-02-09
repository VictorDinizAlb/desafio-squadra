import { getCustomRepository } from 'typeorm';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class DeletarUfService {
  public async execute(codigoUF: number): Promise<boolean> {
    const ufsRepository = getCustomRepository(UfRepository);
    const uf = await ufsRepository.procurarPorCodigo(codigoUF);

    if (!uf || uf.status == 2) {
      return true;
    }

    uf.status = 2;
    await ufsRepository.save(uf);
    return false;
  }
}

export default DeletarUfService;
