import { Home } from './home';
import { render, screen } from '../utils/test-utils';
import { iStore } from '../store/store';
import { BrowserRouter } from 'react-router-dom';
import { robotReducer } from '../reducers/robots/robot.reducer';
import { iRobot } from '../models/robot';

const reducer = {
    robots: robotReducer,
};
const mockedArray: Array<iRobot> = [
    {
        _id: '',
        name: 'test1',
        image: '',
        speed: 0,
        life: 0,
        born: '',
    },
    {
        _id: '',
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

describe('Given the Home component', () => {
    describe('When calling it', () => {
        test('It should render the redux store data that match the promotion=true', () => {
            render(
                <BrowserRouter>
                    <Home />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const testElement = screen.getByText(/test1/i);
            expect(testElement).toBeInTheDocument();
            const testElement2 = screen.getByText(/robots/i);
            expect(testElement2).toBeInTheDocument();
        });
    });
});
