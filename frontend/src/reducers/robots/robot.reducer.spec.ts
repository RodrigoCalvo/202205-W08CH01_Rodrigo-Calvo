import { robotReducer } from './robot.reducer';
import * as actions from './robot.action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { iRobot } from '../../models/robot';

const mockedArray: Array<iRobot> = [
    {
        _id: '1',
        name: 'test1',
        image: '',
        speed: 0,
        life: 0,
        born: '',
    },
    {
        _id: '2',
        name: 'test1',
        image: '',
        speed: 0,
        life: 0,
        born: '',
    },
];
describe('Given characters reducer', () => {
    describe('When calling it with load action with an array of characters', () => {
        test('It should return a new state with that array of characters', () => {
            const newState = robotReducer(
                [],
                actions.loadRobotsAction(mockedArray)
            );
            expect(newState).toEqual(mockedArray);
        });
    });
    describe('When calling it with add action with a character', () => {
        test('It should return a new state with an array with that character', () => {
            const newState = robotReducer(
                [],
                actions.addRobotAction(mockedArray[0])
            );
            expect(newState).toEqual([mockedArray[0]]);
        });
    });
    describe('When calling it with update action with a character or partial character', () => {
        test('It should return a new state with a updated array of characters', () => {
            const newState = robotReducer(
                mockedArray,
                actions.updateRobotAction({
                    ...mockedArray[0],
                    name: 'true',
                })
            );
            expect(newState.find((item) => item._id === '1')?.name).toBe(
                'true'
            );
        });
    });
    describe('When calling it with delete action with a character', () => {
        test('It should return a new state with an array of previous characters without the deleted one', () => {
            const newState = robotReducer(
                mockedArray,
                actions.deleteRobotAction(mockedArray[0])
            );
            expect(newState).toEqual([mockedArray[1]]);
        });
    });
    describe('When calling it with a non related action', () => {
        test('It should return a new state equal to the previous one', () => {
            const newState = robotReducer(mockedArray, {} as AnyAction);
            expect(newState).toEqual(mockedArray);
        });
    });
});
