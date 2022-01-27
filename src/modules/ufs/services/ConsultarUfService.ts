import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class ConsultarUfService {
  public async procurarPorCodigo(CODIGO_UF: any): Promise<Uf> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.findOne(CODIGO_UF);

    if (!uf) {
      throw new AppError('Nao existe UF com este codigo.');
    }

    return uf;
  }

  public async procurarPorSigla(SIGLA: string): Promise<Uf> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.procurarPorSigla(SIGLA);

    if (!uf) {
      throw new AppError('Nao existe UF com esta sigla.');
    }

    return uf;
  }
}

export default ConsultarUfService;
