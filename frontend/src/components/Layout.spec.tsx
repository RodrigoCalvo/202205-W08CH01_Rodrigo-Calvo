import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../app/App';
import { Layout } from './Layout';

describe('Given the Layout component', () => {
    describe('When calling it with a children component', () => {
        test('Then it should render itself and the children', () => {
            const mockMenuOptions: Array<iRouterItem> = [
                { path: '', label: 'test label', page: <></> },
            ];
            const MockComponent: () => JSX.Element = () => (
                <p>test component</p>
            );
            render(
                <BrowserRouter>
                    <Layout menuOptions={mockMenuOptions}>
                        <MockComponent />
                    </Layout>
                </BrowserRouter>
            );
            const element = screen.getByText(/test comp/i);
            expect(element).toBeInTheDocument();
            const element2 = screen.getByText(/test label/i);
            expect(element2).toBeInTheDocument();
        });
    });
});
