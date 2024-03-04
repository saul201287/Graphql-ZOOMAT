import express from "express";
import { createUserController, getUserController } from "./Dependencies";
export const userRouter = express.Router();

userRouter.post("/", (req, res) => {
  createUserController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.get("/login", (req, res) => {
  getUserController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});
