import mongoose from "mongoose";

const connectMongoDB=async()=>{
  
    const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/E-commerce`)
    console.log('DB Server Connect!!',connectionInstance.connection.host);
    
}

export {connectMongoDB};