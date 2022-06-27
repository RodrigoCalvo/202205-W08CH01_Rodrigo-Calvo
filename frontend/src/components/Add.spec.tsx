import { iRobot } from '../models/robot';
import { robotReducer } from '../reducers/robots/robot.reducer';
import { RobotHttpStore } from '../services/robot.http.store';
import { iStore } from '../store/store';
import { fireEvent, render, screen } from '../utils/test-utils';
import { Add } from './Add';

jest.mock('../services/robot.http.store');

const reducer = {
    robots: robotReducer,
};
const preloadedState: iStore = {
    robots: [] as Array<iRobot>,
};
describe('Given the Add component', () => {
    describe('When calling it and click on "Añadir" button', () => {
        test('Then it should render two textbox, two sliders and an extra button', () => {
            render(<Add />, { preloadedState, reducer });
            const addButton = screen.getByText(/Añadir un robot/i);
            fireEvent.click(addButton);
            const textboxes = screen.getAllByRole('textbox');
            const sliders = screen.getAllByRole('slider');
            const buttons = screen.getAllByRole('button');
            expect(textboxes).toHaveLength(2);
            expect(sliders).toHaveLength(2);
            expect(buttons).toHaveLength(2);
        });
    });
    describe('When not giving it a name and click on "Aceptar" button', () => {
        test('Then http.setRobot function should be called', () => {
            const mockAdd = jest.fn();
            mockAdd.mockResolvedValue({});
            RobotHttpStore.prototype.setRobot = mockAdd;
            render(<Add />, { preloadedState, reducer });
            const addButton = screen.getByText(/Añadir un robot/i);
            fireEvent.click(addButton);
            const sendButton = screen.getByText(/Aceptar/);
            fireEvent.click(sendButton);
            expect(mockAdd).not.toHaveBeenCalled();
        });
    });
    describe('When giving it a name and click on "Aceptar" button', () => {
        test('Then http.setRobot function should be called', () => {
            const mockAdd = jest.fn();
            mockAdd.mockResolvedValue({});
            RobotHttpStore.prototype.setRobot = mockAdd;
            render(<Add />, { preloadedState, reducer });
            const addButton = screen.getByText(/Añadir un robot/i);
            fireEvent.click(addButton);
            const textboxes = screen.getAllByRole('textbox');
            fireEvent.change(textboxes[0], { target: { value: 'test' } });
            const sendButton = screen.getByText(/Aceptar/);
            fireEvent.click(sendButton);
            expect(mockAdd).toHaveBeenCalled();
        });
    });
    describe('When clicking on Añadir and then on Cancelar', () => {
        test('The form should be emptied', () => {
            const mockAdd = jest.fn();
            mockAdd.mockResolvedValue({});
            RobotHttpStore.prototype.setRobot = mockAdd;
            render(<Add />, { preloadedState, reducer });
            fireEvent.click(screen.getByText(/Añadir un robot/i));
            const robotName = 'testtest';
            fireEvent.change(screen.getAllByRole('textbox')[0], {
                target: { value: robotName },
            });
            fireEvent.click(screen.getByText(/Cancelar/));
            const wipedElement = screen.queryByText(robotName);
            expect(wipedElement).not.toBeInTheDocument();
        });
    });
});
