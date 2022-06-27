import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { nextTick } from 'process';
import { iRobot } from '../models/robot.model';

export class Controller<T> {
    constructor(public model: mongoose.Model<T>) {}

    getAllController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            req;
            const result = await this.model.find();
            if (!result) throw new Error('Not data');
            resp.setHeader('Content-type', 'application/json');
            resp.end(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    };
    getController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (req.params.id.length !== 24)
                throw new URIError('ID length not valid');
            const result = await this.model.findById(req.params.id);
            if (result) {
                resp.setHeader('Content-type', 'application/json');
                resp.end(JSON.stringify(result));
            } else {
                throw new ReferenceError('Item not found');
            }
        } catch (error) {
            next(error);
        }
    };
    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.model.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    };
    patchController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (req.params.id.length !== 24) {
                throw new URIError('ID length not valid');
            }
            if (req.body.speed && (req.body.speed > 10 || req.body.speed < 0)) {
                throw new RangeError('Speed value must be between 0 and 10');
            }
            if (req.body.life && (req.body.life > 10 || req.body.life < 0)) {
                throw new RangeError('Life value must be between 0 and 10');
            }

            const result = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            if (result) {
                resp.setHeader('Content-type', 'application/json');
                resp.end(JSON.stringify(result));
            } else {
                throw new ReferenceError('Item not found');
            }
        } catch (error) {
            next(error);
        }
    };
    deleteController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (req.params.id.length !== 24)
                throw new URIError('ID length not valid');
            const success = await this.model.findByIdAndDelete(req.params.id);
            if (success) {
                resp.status(202);
                resp.end(JSON.stringify({}));
            } else {
                throw new ReferenceError('Item not found');
            }
        } catch (error) {
            next(error);
        }
    };
}
