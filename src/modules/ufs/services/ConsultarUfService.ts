import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UfTratado from '../typeorm/entities/UfTratado';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

class ConsultarUfService {
  public async procurarPorCodigo(
    CODIGO_UF: any,
  ): Promise<UfTratado | UfTratado[] | boolean> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.procurarPorCodigo(CODIGO_UF);

    if (!uf) {
      return false;
    }

    const ufsTratados = ufsRepository.trataResponse(uf);

    return ufsTratados;
  }

  public async procurarPorSigla(
    SIGLA: string,
  ): Promise<UfTratado | UfTratado[] | boolean> {
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.procurarPorSigla(SIGLA);

    if (!uf) {
      return false;
    }

    const ufsTratados = ufsRepository.trataResponse(uf);

    return ufsTratados;
  }
}

export default ConsultarUfService;
