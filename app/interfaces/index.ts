import Express from 'express';
import Helmet from 'helmet';
import Morgan from 'morgan';
import middlewares from "@app/middlewares/index";

interface IBundle {
  morgan: typeof Morgan,
  helmet: typeof Helmet,
  express: typeof Express,
  middlewares: typeof middlewares;
}

interface IConfig {}

export { IBundle, IConfig }