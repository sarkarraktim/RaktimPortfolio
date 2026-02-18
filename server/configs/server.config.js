import chalk from "chalk";
import { config } from "dotenv";
import mongoose from "mongoose";
import { InitializeGridFS } from "./gridfs.config.js";
config();

const PORT = process.env.PORT || 4000;
// const NODE_ENV = process.env.NODE_ENV;
const localhost = process.env.localhost;

const MONGO_URI = process.env.MONGO_URI;

export const mongodbConnect = (app) => {
  mongoose.connect(MONGO_URI).then(()=>{
    console.log(chalk.green('Mongodb is connected'));
    app.listen(PORT, () => {
      console.log(`Server Running at port: ${chalk.greenBright(`http://${localhost}:${PORT}`)}`);
    });
    InitializeGridFS();
    return mongoose.connection;
  }).catch(e => console.log(chalk.red(e.message)))
}