import helmet from "helmet";
import morgan from "morgan";
import { bundle } from "@app/bundle/index";
import { Request, Response, NextFunction } from "express";

const app = bundle.express();

app.use(helmet())
app.use(morgan('tiny'))

app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json({
    maintainer: "rzkytmgr",
    email: "rzkytmgr[at]gmail.com"
  })
})


app.use(bundle.middlewares.errorHandlerMiddleware);

app.listen(3001, () => {
  console.debug(`[Server] Server running on port ${3001}`)
});