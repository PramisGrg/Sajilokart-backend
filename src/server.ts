import express from "express";
import { config } from "dotenv";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.DATABASE_URI;
console.log(uri);

app.listen(3000, () => {
  console.log("Server running in port", 3000);
});
