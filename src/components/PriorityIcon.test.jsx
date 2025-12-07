import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PriorityIcon from './PriorityIcon';

vi.mock('../assets/alarm-high.svg', () => ({ default: 'alarm-high.svg' }));
vi.mock('../assets/alarm-medium.svg', () => ({ default: 'alarm-medium.svg' }));
vi.mock('../assets/alarm-low.svg', () => ({ default: 'alarm-low.svg' }));

describe('PriorityIcon', () => {
    it('renders High Priority icon correctly', () => {
        render(<PriorityIcon priority={1} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'High Priority');
        expect(img).toHaveAttribute('src', expect.stringContaining('alarm-high.svg'));
    });

    it('renders Medium Priority icon correctly', () => {
        render(<PriorityIcon priority={2} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'Medium Priority');
        expect(img).toHaveAttribute('src', expect.stringContaining('alarm-medium.svg'));
    });

    it('renders Low Priority icon correctly', () => {
        render(<PriorityIcon priority={3} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'Low Priority');
        expect(img).toHaveAttribute('src', expect.stringContaining('alarm-low.svg'));
    });

    it('renders nothing for unknown priority', () => {
        const { container } = render(<PriorityIcon priority={99} />);
        expect(container.firstChild).toBeNull();
    });
});
