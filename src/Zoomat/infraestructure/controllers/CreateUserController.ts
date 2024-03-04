import { Request, Response } from "express";
import { CreateUserUseCase } from "../../app/User/CreateUserUseCase";

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user: any = await this.createUserUseCase.run(
        data.nombre,
        data.password,
        data.usuario,
        data.correo      );

      if (user)
        res
          .status(201)
          //.header("token", data.token)
          .send({
            status: "success",
            data: {
              id: user?.id,
              nombre: user?.nombre,
              password: user?.password,
              usuario: user?.usuario,
              correo: user?.correo,
            },
          });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        status: "error",
        data: "Ocurrio un error",
        mesagges: error,
      });
    }
  }
}
