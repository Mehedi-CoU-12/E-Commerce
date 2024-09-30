import app from './app.js'
import dotenv from 'dotenv'
import {connectMongoDB} from './config/database.js'

//handling uncaught exception

process.on('uncaughtException',(error)=>{
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to uncaught exceptioni')
    process.exit(1);
})

//config
dotenv.config({path:'Backend/config/config.env'});

//connecting to database
connectMongoDB();

const port=process.env.PORT || 4000;

const server= app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS WORKING ON http://localhost:${port}`);
})


//unhandled promise rejection
process.on("unhandledRejection",(error)=>{
    console.log(`Error: ${error}`);
    console.log('Shutting down the server due to unhandled promise rejection');

    server.close(()=>{
        process.exit(1);
    })
})