import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import { MunicipioRepository } from '../typeorm/repositories/MunicipiosRepository';

interface IRequest {
  codigoMunicipio: number;
  codigoUF: number;
  nome: string;
  status: number;
}

export default class AlterarMunicipioService {
  public async execute({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio | boolean> {
    const municipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipiosRepository.procurarPorCodigo(
      codigoMunicipio,
    );

    if (!municipio) {
      return true;
    }

    const municipioExists = await municipiosRepository.procurarPorNome(nome);

    if (municipioExists && nome !== municipio.nome) {
      return true;
    }

    municipio.codigoUF = codigoUF;
    municipio.nome = nome;
    municipio.status = status;

    await municipiosRepository.save(municipio);

    return municipio;
  }
}
