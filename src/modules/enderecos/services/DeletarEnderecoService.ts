import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosRepository';

export default class DeleteEnderecoService {
  public async execute( CODIGO_PESSOA: number): Promise<void> {
    const enderecosRepository = getCustomRepository(EnderecoRepository);

    const enderecos = await enderecosRepository.find({
      where: {
        CODIGO_PESSOA,
      },
    });

    if (!enderecos) {
      throw new AppError('endereco not found.');
    }

    await enderecosRepository.remove(enderecos);
  }
}
