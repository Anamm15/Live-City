import express from "express";
import morgan from "morgan";
import routes from "./routes";
import bodyParser from "body-parser";
import { corsConfig } from "./config/cors";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", routes);
app.use("/api/v1", routes);

export default app;
