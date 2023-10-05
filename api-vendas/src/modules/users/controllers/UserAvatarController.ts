import {Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService copy";

export default class  UserAvatarController {

  public async update(req: Request, res: Response): Promise<Response>{

    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file!.filename,
    });

    return res.json(user);
  }
}
