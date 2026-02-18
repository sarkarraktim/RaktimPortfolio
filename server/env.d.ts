declare namespace NodeJS {
  interface ProcessEnv {
    localhost: string;
    PORT: string;
    NODE_ENV: string;
    MONGO_URI: string;
    DISABLE_LIVERELOAD: boolean;
  }
}