import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Database Connected Successfully.") 
    }
    catch(err)
    {
        console.log("Database connection error.", err)
    }
}  

export default connectDB;