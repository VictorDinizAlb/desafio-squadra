import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { MunicipioRepository } from "../typeorm/repositories/MunicipiosRepository";

interface IRequest{
  id: string;
}

class DeleteMunicipioService{
  public async execute({ id }: IRequest): Promise<void>{
    const MunicipiosRepository = getCustomRepository(MunicipioRepository);

    const municipio = await MunicipiosRepository.findOne(id);

    if(!municipio) {
      throw new AppError('Municipio not found.')
    }

    await MunicipiosRepository.remove(municipio);

  }
}

export default DeleteMunicipioService;
