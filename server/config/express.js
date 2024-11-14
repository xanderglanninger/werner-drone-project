import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../api/routes/index.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api", router);

export default app;
