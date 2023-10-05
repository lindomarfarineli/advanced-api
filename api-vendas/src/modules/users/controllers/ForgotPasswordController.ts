import {Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class  ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response>{
    const { email } = req.body;

    const sendForgtPasswordEmail = new SendForgotPasswordEmailService();

     await sendForgtPasswordEmail.execute({
      email,
    });

    return res.status(204).json();
  }
}
