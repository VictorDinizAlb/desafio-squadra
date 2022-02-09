import { getCustomRepository } from 'typeorm';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

export default class DeletarBairroService {
  public async execute(codigoBairro: number): Promise<boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);
    const bairro = await bairrosRepository.procurarPorCodigo(codigoBairro);

    if (!bairro || bairro.status == 2) {
      return true;
    }

    bairro.status = 2;
    await bairrosRepository.save(bairro);
    return false;
  }
}
