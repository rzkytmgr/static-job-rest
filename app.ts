import express, { Request, Response, NextFunction } from "express";

const app = express()

app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json({ 
    status: 200,
    message: 'Hello World!',
  });
})

app.listen(3001, () => {
  console.debug(`[Server] Server running on port ${3001}`)
});