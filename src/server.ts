import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { NotFoundController } from "./utils/notFound.utils";
import mainRouter from "./routes/main.routes";
import { genericErrorHandler } from "./middlewares/genericErrorHandler.middleware";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRouter);
app.use("*", NotFoundController);
app.use(genericErrorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in port, ${PORT}`);
});
