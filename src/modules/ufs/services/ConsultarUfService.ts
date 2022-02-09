import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class ConsultarUfService {
  public async procurarPorCodigo(
    codigoUF: any,
  ): Promise<Uf | Uf[] | boolean> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.procurarPorCodigo(codigoUF);

    if (!uf) {
      return false;
    }

    return uf;
  }

  public async procurarPorSigla(
    sigla: string,
  ): Promise<Uf | Uf[] | boolean> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.procurarPorSigla(sigla);

    if (!uf) {
      return false;
    }

    return uf;
  }
}

export default ConsultarUfService;
