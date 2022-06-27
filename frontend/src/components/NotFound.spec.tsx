import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

describe('Given the NotFound component', () => {
    describe('When calling it', () => {
        test('Then it should render', () => {
            render(<NotFound />);
            const element = screen.getByText(/404/);
            expect(element).toBeInTheDocument();
        });
    });
});
