import { getCustomRepository } from 'typeorm';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosRepository';

export default class DeleteEnderecoService {
  public async execute(codigoPessoa: number): Promise<void> {
    const enderecosRepository = getCustomRepository(EnderecoRepository);

    const enderecos = await enderecosRepository.find({
      where: {
        codigoPessoa,
      },
    });

    if (enderecos) {
      await enderecosRepository.remove(enderecos);
    }
  }
}
