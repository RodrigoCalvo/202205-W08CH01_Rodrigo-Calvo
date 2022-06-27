import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { robotsRouter } from './routers/robots.js';
import cors from 'cors';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/robots', robotsRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    req;
    next;
    let status: number;
    switch (error.name) {
        case 'ValidationError':
            status = 406;
            break;
        case 'URIError':
            status = 400;
            break;
        case 'ReferenceError':
            status = 404;
            break;
        case 'RangeError':
            status = 416;
            break;
        default:
            status = 500;
    }
    res.status(status);
    res.end(JSON.stringify({ type: error.name, message: error.message }));
});
