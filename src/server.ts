import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./Zoomat/infraestructure/ServicesGraphql/Schemas";
import { ResolversGraph } from "./Zoomat/infraestructure/Dependencies";
import { userRouter } from "./Zoomat/infraestructure/UserRouter";

const app = express();
app.use(helmet.hidePoweredBy());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use("/user", userRouter);

const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);
//const port: number | undefined = process.env.PORT;
let resolvers = ResolversGraph.resolvers;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`servidor corriendo en ${url}`);
})();
