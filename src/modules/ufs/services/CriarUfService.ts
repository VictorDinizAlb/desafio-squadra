import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UfTratado from '../typeorm/entities/UfTratado';
import { UfRepository } from '../typeorm/repositories/UfsRepository';

interface IRequest {
  SIGLA: string;
  NOME: string;
  STATUS: number;
}

class CriarUfService {
  public async execute({
    SIGLA,
    NOME,
    STATUS,
  }: IRequest): Promise<UfTratado | UfTratado[] | AppError> {
    const ufRepository = getCustomRepository(UfRepository);
    const ufExists = await ufRepository.procurarPorSigla(SIGLA);

    if (ufExists && ufExists.STATUS !== 2) {
      const err = new AppError('Ja existe um UF com esta SIGLA', 404);

      return err;
    }

    const CODIGO_UF = await ufRepository.buscarSequence();

    const uf = ufRepository.create({
      CODIGO_UF,
      SIGLA,
      NOME,
      STATUS,
    });

    await ufRepository.save(uf);

    const ufTratado = ufRepository.trataResponse(uf);

    return ufTratado;
  }
}

export default CriarUfService;
