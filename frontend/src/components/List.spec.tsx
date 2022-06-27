import { render, screen } from '../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { robotReducer } from '../reducers/robots/robot.reducer';
import { List } from './List';
import { iStore } from '../store/store';
import { iRobot } from '../models/robot';

const reducer = {
    robots: robotReducer,
};
const preloadedState: iStore = {
    robots: [] as Array<iRobot>,
};
const mockProduct: iRobot = {
    _id: '',
    name: 'test1',
    image: '',
    speed: 0,
    life: 0,
    born: '',
};

describe('Given the List component', () => {
    describe('When calling it with a products array', () => {
        test('Then it should render a product card for each array element', () => {
            render(
                <BrowserRouter>
                    <List data={[mockProduct]} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getAllByRole('listitem');
            expect(element).toHaveLength([mockProduct].length);
            const element2 = screen.getByText(/test1/i);
            expect(element2).toBeInTheDocument();
        });
    });
});
