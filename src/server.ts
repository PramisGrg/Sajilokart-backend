import { config } from "dotenv";
config();
import express from "express";
import { NotFoundController } from "./utils/notFound.utils";
import mainRouter from "./routes/main.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRouter);
app.use("*", NotFoundController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in port, ${PORT}`);
});
