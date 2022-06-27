import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../app/App';
import { Header } from './Header';

describe('Given the Header component', () => {
    describe('When calling it with a menuOptions array', () => {
        test(`Then it should render itself following the options
        but it should not render a "Details" menu item`, () => {
            const mockMenuOptions: Array<iRouterItem> = [
                { path: '', label: 'test label', page: <></> },
                { path: '', label: 'Detalles', page: <></> },
            ];
            render(
                <BrowserRouter>
                    <Header menuOptions={mockMenuOptions} />
                </BrowserRouter>
            );
            const element = screen.getByText(/war robots/i);
            expect(element).toBeInTheDocument();
            const element2 = screen.getByText(/test label/i);
            expect(element2).toBeInTheDocument();
            const element3 = screen.queryByText(/detalles/i);
            expect(element3).not.toBeInTheDocument();
        });
    });
});
