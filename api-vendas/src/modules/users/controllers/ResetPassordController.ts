import {Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";
import ResetService from "../services/ResetPasswordService";

export default class  ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response>{
    const { token, password } = req.body;

    const resetPassword = new ResetService();

     await resetPassword.execute({
      password,
      token
    });

    return res.status(204).json();
  }
}
