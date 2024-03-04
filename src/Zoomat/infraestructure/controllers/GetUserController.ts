import { Request, Response } from "express";
import { GetUserUseCase } from "../../app/User/GetUserUseCase";

export class GetUserController {
  constructor(readonly getUserUseCase: GetUserUseCase) {}
  async run(req: Request, res: Response) {
    const { usuario, password } = req.body;

    try {
      const user = await this.getUserUseCase.run(usuario, password);
      if (user) {
        res.status(200).header({ token: user?.[1] }).json({
          estatus: "success",
          data: "Credenciales validas",
        });
      } else {
        res.status(204).json({
          msg: "Credenciales invalidas",
          error: "No fue posible encontrar al usuario",
        });
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
