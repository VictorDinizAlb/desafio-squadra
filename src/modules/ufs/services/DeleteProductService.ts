import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UfRepository } from "../typeorm/repositories/UfsRepository";

interface IRequest{
  id: string;
}

class DeleteUfService{
  public async execute({ id }: IRequest): Promise<void>{
    const ufsRepository = getCustomRepository(UfRepository);

    const uf = await ufsRepository.findOne(id);

    if(!uf) {
      throw new AppError('uf not found.')
    }

    await ufsRepository.remove(uf);

  }
}

export default DeleteUfService;
