import { BrowserRouter, useNavigate } from 'react-router-dom';
import { iRobot } from '../models/robot';
import { robotReducer } from '../reducers/robots/robot.reducer';
import { iStore } from '../store/store';
import { fireEvent, render, screen } from '../utils/test-utils';
import { Details } from './details';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
const reducer = {
    robots: robotReducer,
};
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
        name: 'test2',
        image: '',
        speed: 0,
        life: 0,
        born: '',
    },
];
const preloadedState: iStore = {
    robots: mockedArray as Array<iRobot>,
};
const mockedNavigate = jest.fn();

describe('Given Details component', () => {
    describe('When calling it with a valid existent product id', () => {
        test('It should render the info of the related product', () => {
            render(
                <BrowserRouter>
                    <Details id="1" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const testElement = screen.getByText(/test1/i);
            expect(testElement).toBeInTheDocument();
        });
    });
    describe('When calling it with a valid non existent product id', () => {
        test('It should render a warning of no disponible', () => {
            render(
                <BrowserRouter>
                    <Details id="test3" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const testElement = screen.getByText(/disponible actualmente/i);
            expect(testElement).toBeInTheDocument();
        });
    });
    describe('When clicked the back button', () => {
        beforeEach(() => {
            (useNavigate as jest.Mock).mockImplementation(() => mockedNavigate);
        });
        test('It should call the navigate function with a -1 arg', () => {
            render(
                <BrowserRouter>
                    <Details id="1" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByText(/Volver/i);
            fireEvent.click(button);
            expect(mockedNavigate).toHaveBeenCalled();
        });
    });
});
