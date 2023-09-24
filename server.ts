import express from "express";
import * as dotenv from "dotenv";
import userRoute from "./routes/user";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
