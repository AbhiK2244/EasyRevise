import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/dbConnection.js";
import codeRouter from "./routes/code.route.js"

dotenv.config();
const PORT = 4000;
const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();


app.use("/api/code", codeRouter)

app.get("/", (req, res) => {
    res.send("Hello");
})


app.listen(PORT, () => {
    console.log("Server running on port ", PORT)
})