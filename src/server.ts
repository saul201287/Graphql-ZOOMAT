import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet"

const app = express();
app.use(helmet.hidePoweredBy());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

const options = {
  secrets: ["([0-9]{4}-?)+"]
};

const logger = new Signale(options);
const port: string | undefined = process.env.PORT;


app.listen(3000, () => {
  logger.success("server listening on port:", port);
});

