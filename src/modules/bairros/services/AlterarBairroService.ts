import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entities/Bairro';
import { BairroRepository } from '../typeorm/repositories/BairrosRepository';

interface IRequest {
  codigoBairro: number;
  codigoMunicipio: number;
  nome: string;
  status: number;
}

export default class AlterarBairroService {
  public async execute({
    codigoBairro,
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro | boolean> {
    const bairrosRepository = getCustomRepository(BairroRepository);

    const bairro = await bairrosRepository.procurarPorCodigo(codigoBairro);

    if (!bairro) {
      return true;
    }

    bairro.codigoMunicipio = codigoMunicipio;
    bairro.nome = nome;
    bairro.status = status;

    await bairrosRepository.save(bairro);

    return bairro;
  }
}
