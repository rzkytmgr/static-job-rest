import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { IBundle } from "@app/interfaces/index"; 
import middlewares from "@app/middlewares/index";

export const bundle: IBundle = {
  morgan,
  helmet,
  express,
  middlewares,
}