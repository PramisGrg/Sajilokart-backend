import express from "express";
import { config } from "dotenv";
import { NotFoundController } from "./utils/notFound.utils";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*", NotFoundController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in port, ${PORT}`);
});
