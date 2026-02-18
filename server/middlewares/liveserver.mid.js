import connectlivereload from "connect-livereload";
import LiveReloadServer from "livereload";

/**
 * @param {import('express').Application} app
*/
export const liveServerConnect = (app, __dirname, path) => {

  if(process.env.NODE_ENV = "production" || process.env.DISABLE_LIVERELOAD === 'true') return;

  if(!connectlivereload || !LiveReloadServer) return;
  const Lsr = LiveReloadServer.createServer({
    port: 35729,
    exts: ["ejs", "js", "css"],
    applyCSSLive: true,
    applyImgLive: true
  });

  Lsr.watch([
    path.join(__dirname, 'views')
  ]);

  app.use(connectlivereload({
    port: 35729,
  }));

  Lsr.server.once('connection', ()=>{
    setTimeout(() => {
      Lsr.refresh('*')
    }, 10);
  });

}