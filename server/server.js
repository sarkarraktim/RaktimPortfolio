import express from 'express';
import { localhost, mongodbConnect, PORT } from './configs/server.config.js';
import { serverRouter } from './routers/server.route.js';
import { liveServerConnect } from './middlewares/liveserver.mid.js';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

/*Variable declearation*/
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*Cross Origin*/
const crossOrigin = {
  origin: [`http://localhost:80`]
}
crossOrigin

app.use(cors());

/*ejs setting*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));

/*json object get data*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*Live Refresh browser*/
liveServerConnect(app, __dirname, path);

/*Router*/
app.use(serverRouter);

/*Run Server*/
function runserver() {
  try {
    //mongodb and server connect:
    mongodbConnect(app);
    app.listen(PORT, () => {
      console.log(`Server Running at port: ${chalk.greenBright(`http://${localhost}:${PORT}`)}`);
    });

  } catch (error) {
    error instanceof Error ? 
    console.log(error.message) : null
  }
};
runserver();
