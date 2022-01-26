import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Uf from "../typeorm/entities/Uf";
import { UfRepository } from "../typeorm/repositories/UfsRepository";

interface IRequest{
  SIGLA: string;
  NOME: string;
  STATUS: number;
}

class CriarUfService{
  public async execute({SIGLA, NOME, STATUS}: IRequest): Promise<Uf>{
    const ufRepository = getCustomRepository(UfRepository);
    const ufExists = await ufRepository.findBySigla(SIGLA);

    if(ufExists){
      throw new AppError('Ja existe um UF com esta SIGLA', 404)
    }

    const uf = ufRepository.create({
      SIGLA,
      NOME,
      STATUS,
    });

    await ufRepository.save(uf);

    return uf;
  }
}

export default CriarUfService;
