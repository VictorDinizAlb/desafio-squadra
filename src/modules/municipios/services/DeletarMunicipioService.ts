import { getCustomRepository } from 'typeorm';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

export default class DeletarMunicipioService {
  public async execute(CODIGO_MUNICIPIO: any): Promise<boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);
    const municipio = await municipiosRepository.procurarPorCodigo(CODIGO_MUNICIPIO);

    if (!municipio || municipio.STATUS == 2) {
      return true;
    }

    municipio.STATUS = 2;
    await municipiosRepository.save(municipio);
    return false;
  }
}
