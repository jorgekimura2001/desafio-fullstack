import "reflect-metadata"
import "express-async-errors"
import express from 'express';
import handleErrorMiddleware from "./middlewares/handleError.middleware"
import appRoutes from './routes';
import cors from 'cors'

// const cors = require('cors')

const app = express();

app.use(express.json())

appRoutes(app)

app.use(handleErrorMiddleware)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PATCH,POST,DELETE');
    app.use(cors());
    next();
});

export default app