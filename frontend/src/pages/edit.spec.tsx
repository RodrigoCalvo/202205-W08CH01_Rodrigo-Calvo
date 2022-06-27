import { BrowserRouter, useNavigate } from 'react-router-dom';
import { iRobot } from '../models/robot';
import { robotReducer } from '../reducers/robots/robot.reducer';
import { iStore } from '../store/store';
import { fireEvent, render, screen } from '../utils/test-utils';
import { Edit } from './edit';
import { RobotHttpStore } from '../services/robot.http.store';

jest.mock('../services/robot.http.store');
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
        speed: 7,
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

describe('Given Edit component', () => {
    describe('When calling it with a valid existent product id', () => {
        test('It should render the info of the related product', () => {
            render(
                <BrowserRouter>
                    <Edit id="1" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const testElement = screen.getByText(/7/i);
            expect(testElement).toBeInTheDocument();
        });
    });
    describe('When calling it with a valid non existent product id', () => {
        test('It should render a warning of no disponible', () => {
            render(
                <BrowserRouter>
                    <Edit id="3" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const testElement = screen.getByText(/disponible actualmente/i);
            expect(testElement).toBeInTheDocument();
        });
    });
    describe('When clicking on a edit button', () => {
        test('Then it should enable the text to write', () => {
            render(
                <BrowserRouter>
                    <Edit id="1" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getAllByTestId(/editBtn/i);
            button.forEach((btn) => fireEvent.click(btn));
            // fireEvent.click(button[0]);
            const textboxes = screen.getAllByRole('textbox');
            expect((textboxes[0] as HTMLFormElement).value).toBe(
                mockedArray[0].name
            );
            fireEvent.change(textboxes[0], { target: { value: 'test5' } });
            expect((textboxes[0] as HTMLFormElement).value).toBe('test5');
        });
    });
    describe('When name is introduced an clicking on the Aceptar button', () => {
        beforeEach(() => {
            (useNavigate as jest.Mock).mockImplementation(() => mockedNavigate);
        });
        test('Then http.updateRobot function should be called', () => {
            const mockUpdate = jest.fn();
            mockUpdate.mockResolvedValue({});
            RobotHttpStore.prototype.updateRobot = mockUpdate;
            render(
                <BrowserRouter>
                    <Edit id="1" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const buttons = screen.getAllByTestId(/editBtn/);
            fireEvent.click(buttons[0]);
            const textboxes = screen.getAllByRole('textbox');
            fireEvent.change(textboxes[0], { target: { value: 'test5' } });
            const sendButton = screen.getByText(/Aceptar/);
            fireEvent.click(sendButton);
            expect(mockUpdate).toHaveBeenCalled();
        });
    });
    describe('When name is not introduced an clicking on the Aceptar button', () => {
        beforeEach(() => {
            (useNavigate as jest.Mock).mockImplementation(() => mockedNavigate);
        });
        test('Then http.updateRobot function should not be called', () => {
            const mockUpdate = jest.fn();
            mockUpdate.mockResolvedValue({});
            RobotHttpStore.prototype.updateRobot = mockUpdate;
            render(
                <BrowserRouter>
                    <Edit id="1" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const buttons = screen.getAllByTestId(/editBtn/);
            fireEvent.click(buttons[0]);
            const textboxes = screen.getAllByRole('textbox');
            fireEvent.change(textboxes[0], { target: { value: '' } });
            const sendButton = screen.getByText(/Aceptar/);
            fireEvent.click(sendButton);
            expect(mockUpdate).not.toHaveBeenCalled();
        });
    });
    describe('When clicked the back button', () => {
        beforeEach(() => {
            (useNavigate as jest.Mock).mockImplementation(() => mockedNavigate);
        });
        test('It should call the navigate function with a -1 arg', () => {
            render(
                <BrowserRouter>
                    <Edit id="1" />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByText(/Cancelar/i);
            fireEvent.click(button);
            expect(mockedNavigate).toHaveBeenCalled();
        });
    });
});
