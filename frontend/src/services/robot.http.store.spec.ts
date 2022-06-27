import { iRobot, Robot } from '../models/robot';
import { RobotHttpStore } from './robot.http.store';

const prod1 = new Robot('', '', 0, 0, '') as iRobot;
const prod2 = new Robot('', '', 0, 0, '') as iRobot;
const prod3 = new Robot('', '', 0, 0, '') as iRobot;

describe('Given RobotHttpStore service', () => {
    describe('When called getProduct', () => {
        test('Then it should return a product from the cart db', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(prod1),
            });
            const api = new RobotHttpStore();
            const response = await api.getRobot('');
            expect(response).toEqual(prod1);
        });
    });
    describe('When called getAllProducts', () => {
        test('Then it should return a products array', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue([prod1, prod3]),
            });
            const api = new RobotHttpStore();
            const response = await api.getAllRobots();
            expect(response).toEqual([prod1, prod3]);
        });
    });
    describe('When called setProduct with a product to add', () => {
        test('Then it should return the added product', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(prod2),
            });
            const api = new RobotHttpStore();
            const response = await api.setRobot(prod2);
            expect(response).toEqual(prod2);
        });
    });
    describe('When called updateProduct with a modified existent product', () => {
        test('Then it should return the updated product', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest
                    .fn()
                    .mockResolvedValue({ ...prod1, promotion: true }),
            });
            const api = new RobotHttpStore();
            const response = await api.updateRobot(prod1._id, {
                ...prod1,
                name: 'new',
            });
            const expectedResponse = { ...prod1, promotion: true };
            expect(response).toEqual(expectedResponse);
        });
    });
    describe('When called deleteProduct with a product', () => {
        test('Then it should return status 200', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(prod3),
            });
            const api = new RobotHttpStore();
            const response = await api.deleteRobot(prod3._id);
            expect(response).toEqual(prod3);
        });
    });
});
