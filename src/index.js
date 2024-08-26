const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World hehe"));

mongoose
  .connect(
    `mongodb+srv://vietanhle2662001:${process.env.MONGO_DB}@cluster0.jurup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
