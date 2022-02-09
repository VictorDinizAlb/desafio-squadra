import { getCustomRepository } from 'typeorm';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

export default class DeletarMunicipioService {
  public async execute(codigoMunicipio: any): Promise<boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);
    const municipio = await municipiosRepository.procurarPorCodigo(
      codigoMunicipio,
    );

    if (!municipio || municipio.status == 2) {
      return true;
    }

    municipio.status = 2;
    await municipiosRepository.save(municipio);
    return false;
  }
}
