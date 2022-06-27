import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Given the Footer component', () => {
    describe('When calling it', () => {
        test('Then it should render', () => {
            render(<Footer />);
            const element = screen.getByText(/rodrigo/i);
            expect(element).toBeInTheDocument();
        });
    });
});
