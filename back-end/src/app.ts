import "reflect-metadata"
import "express-async-errors"
import express from 'express';
import handleErrorMiddleware from "./middlewares/handleError.middleware"
import appRoutes from './routes';

const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json())

appRoutes(app)

app.use(handleErrorMiddleware)

export default app