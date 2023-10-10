import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from 'path';
import { allow } from "joi";


interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService{
  public async execute({email}:IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = await getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exist.');
    }

    const token = await usersTokensRepository.generate(user.id);

    //token é um objeto, sendToken já é string
    const sendToken = token.token;

    const forgotPasswordTemplate = path.resolve(__dirname,
      '..', 'views', 'forgotPassword.hbs');

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${sendToken}`,
          //considerando aqui que haja um link no frontEnd que trate disso,
          //não seria obrigação do back tratar de receber o token e montar
          //a requisição
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
