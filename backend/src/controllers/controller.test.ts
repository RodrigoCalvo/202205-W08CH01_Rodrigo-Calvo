import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Controller } from './controller';

describe('Given a instantiated controller DataController', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction = jest.fn();

    let mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    let controller = new Controller(mockModel as unknown as mongoose.Model<{}>);

    beforeEach(() => {
        req = {
            params: { id: '62b5d4943bc55ff0124f6c1d' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
    });
    describe('When method getAllController is called and it success', () => {
        test('Then in success resp.end should be called with the data', async () => {
            const mockResult = [{ test: 'test' }];
            (mockModel.find as jest.Mock).mockResolvedValue(mockResult);
            await controller.getAllController(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('Then in not success function "next" should be called with the error', async () => {
            (mockModel.find as jest.Mock).mockResolvedValue(null);
            next = jest.fn();
            await controller.getAllController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });
    describe('When method getController is called', () => {
        test('Then with a ok response resp.end should be called with data', async () => {
            const mockResult = { test: 'test' };
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            await controller.getController(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('Then with a not ok response next should be called with an error', async () => {
            const mockResult = null;
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            next = jest.fn();
            await controller.getController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(ReferenceError));
        });
        test('Then with a not ok id next should be called with an error', async () => {
            req = {
                params: { id: '943bc55ff0124f6c1d' },
            };
            next = jest.fn();
            await controller.getController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(URIError));
        });
    });
    describe('When method postController is called', () => {
        test('Then if not error resp.end should be called with data', async () => {
            const mockResult = { test: 'test' };
            (mockModel.create as jest.Mock).mockResolvedValue(mockResult);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('Then if error function next should be called', async () => {
            const mockResult = null;
            (mockModel.create as jest.Mock).mockRejectedValue(mockResult);
            next = jest.fn();
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(null);
        });
    });
    describe('When method patchController is called', () => {
        test('Then with a not ok id next should be called with an error', async () => {
            req = {
                params: { id: '943bc55ff0124f6c1d' },
            };
            next = jest.fn();
            await controller.patchController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(URIError));
        });
        test('Then with a non valid value of speed, next should be called with an error', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                body: { speed: -6 },
            };
            next = jest.fn();
            await controller.patchController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(RangeError));
        });
        test('Then with a non valid value of life, next should be called with an error', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                body: { life: 66 },
            };
            next = jest.fn();
            await controller.patchController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(RangeError));
        });
        test('Then with a non existent id, next should be called with an error', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                body: { life: 8 },
            };
            const mockResult = null;
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
                mockResult
            );
            next = jest.fn();
            await controller.patchController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(ReferenceError));
        });
        test('Then with all valid data, res.end should be called with the data', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                body: { test: 'newtest' },
            };
            const mockResult = { test: 'test' };
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
                mockResult
            );
            next = jest.fn();
            await controller.patchController(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When method deleteController is called', () => {
        test('Then with a not ok id next should be called with an error', async () => {
            req = {
                params: { id: '943bc55ff0124f6c1d' },
            };
            next = jest.fn();
            await controller.deleteController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(URIError));
        });
        test('Then on success result res.end should be called with empty object', async () => {
            const mockResult = true;
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await controller.deleteController(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then on not success result next should be called with an error', async () => {
            const mockResult = false;
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            next = jest.fn();
            await controller.deleteController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(expect.any(ReferenceError));
        });
    });
});
