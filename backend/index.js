import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";

dotenv.config();
const PORT = 4000;
const app = express(); 

app.use(cors());
app.use(express.json());
connectDB();

 
app.get("/", (req, res) => {
    res.send("Hello");
})


app.listen(PORT, () => {
    console.log("Server running on port ", PORT)
})