import DotenvFlow from "dotenv-flow";
DotenvFlow.config();

import routes from "./routes";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { corsConfig } from "./config/cors";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", routes);

export default app;
