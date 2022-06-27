import { BrowserRouter } from 'react-router-dom';
import { iRobot } from '../models/robot';
import { robotReducer } from '../reducers/robots/robot.reducer';
import { iStore } from '../store/store';
import { fireEvent, render, screen } from '../utils/test-utils';
import { RobotCard } from './Card';
import { RobotHttpStore } from '../services/robot.http.store';

jest.mock('../services/robot.http.store');

const reducer = {
    robots: robotReducer,
};
const mockItem1: iRobot = {
    _id: '',
    name: 'test1',
    image: '',
    speed: 0,
    life: 0,
    born: '',
};
const preloadedState: iStore = {
    robots: [] as Array<iRobot>,
};

describe('Given the Card component', () => {
    describe('When calling it with a product object', () => {
        test('Then it should render with the object data', () => {
            render(
                <BrowserRouter>
                    <RobotCard robot={mockItem1} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/test1/i);
            expect(element).toBeInTheDocument();
        });
    });
    describe('When clicking on delete button', () => {
        test('Then http.deleteRobot function should be called', () => {
            const mockDelete = jest.fn();
            mockDelete.mockResolvedValue({});
            RobotHttpStore.prototype.deleteRobot = mockDelete;
            render(
                <BrowserRouter>
                    <RobotCard robot={mockItem1} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByRole('button');
            fireEvent.click(button);
            expect(mockDelete).toHaveBeenCalled();
        });
    });
});
