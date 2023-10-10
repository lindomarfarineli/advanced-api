import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import {isAfter, addHours} from 'date-fns';
import {hash} from 'bcryptjs';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

class ResetService{
  public async execute({token, password}:IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = await getCustomRepository(UsersTokensRepository);

    const userToken = await usersTokensRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User token does not exist.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    user.password = await hash(password, 17);

    await usersRepository.save(user);
  }
}
export default ResetService;
