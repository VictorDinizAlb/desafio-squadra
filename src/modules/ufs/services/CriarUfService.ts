import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

interface IRequest {
  sigla: string;
  nome: string;
  status: number;
}

class CriarUfService {
  public async execute({
    sigla,
    nome,
    status,
  }: IRequest): Promise<Uf | Uf[] | AppError> {
    const ufRepository = getCustomRepository(UfRepository);
    const ufExists = await ufRepository.procurarPorSigla(sigla);

    if (ufExists && ufExists.status !== 2) {
      const err = new AppError('Ja existe um UF com esta SIGLA', 404);

      return err;
    }

    // const codigoUF = await ufRepository.buscarSequence();

    const uf = ufRepository.create({
      sigla,
      nome,
      status,
    });

    await ufRepository.save(uf);


    return uf;
  }
}

export default CriarUfService;
