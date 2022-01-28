import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import MunicipioTratado from '../typeorm/entities/MunicipioTratado';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

class ConsultarMunicipioService {
  public async procurarPorCodigo(CODIGO_MUNICIPIO: any): Promise<MunicipioTratado | MunicipioTratado[]> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigo(CODIGO_MUNICIPIO);

    if (!municipio) {
      throw new AppError('Nao existe municipio com este codigo.');
    }

    const municipiosTratados = municipiosRepository.trataResponse(municipio);

    return municipiosTratados;
  }

  public async procurarPorNome(NOME: string): Promise<MunicipioTratado | MunicipioTratado[]> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorNome(NOME);

    if (!municipio) {
      throw new AppError('Nao existe municipio com esta sigla.');
    }

    const municipiosTratados = municipiosRepository.trataResponse(municipio);

    return municipiosTratados;
  }

  public async procurarPorCodigoUF(CODIGO_UF: any): Promise<MunicipioTratado | MunicipioTratado[]> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigoUF(CODIGO_UF);

    if (!municipio) {
      throw new AppError('Nao existe municipio com esta sigla.');
    }

    const municipiosTratados = municipiosRepository.trataResponse(municipio);

    return municipiosTratados;
  }
}

export default ConsultarMunicipioService;
