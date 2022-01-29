import { getCustomRepository } from 'typeorm';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

export default class DeletarBairroService {
  public async execute(CODIGO_BAIRRO: any): Promise<boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);
    const bairro = await bairrosRepository.procurarPorCodigo(CODIGO_BAIRRO);

    if (!bairro || bairro.STATUS == 2) {
      return true;
    }

    bairro.STATUS = 2;
    await bairrosRepository.save(bairro);
    return false;
  }
}
