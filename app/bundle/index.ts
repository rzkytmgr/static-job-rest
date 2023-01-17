import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { IBundle } from "@interfaces/index"; 
import middlewares from "@middlewares/index";

export const bundle: IBundle = {
  morgan,
  helmet,
  express,
  middlewares,
}