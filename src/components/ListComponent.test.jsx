import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ListComponent from './ListComponent';

const mockIncidents = [
    {
        id: 1,
        priority: 1,
        name: 'Test Incident 1',
        formattedDate: '1/1/2023, 10:00:00 AM',
        priorityLabel: 'High',
        locationName: 'Test Location',
        description: 'Test Description 1'
    }
];

describe('ListComponent', () => {
    it('renders incident card with all details', () => {
        render(<ListComponent incidents={mockIncidents} />);
        
        expect(screen.getByText('Test Incident 1')).toBeInTheDocument();
        expect(screen.getByText('Test Location')).toBeInTheDocument();
        expect(screen.getByText('Test Description 1')).toBeInTheDocument();
        expect(screen.getByText('1/1/2023, 10:00:00 AM')).toBeInTheDocument();
        
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'High Priority');
    });

    it('renders multiple cards', () => {
        const twoIncidents = [
            ...mockIncidents,
            { ...mockIncidents[0], id: 2, name: 'Test Incident 2' }
        ];
        const { container } = render(<ListComponent incidents={twoIncidents} />);   
        expect(screen.getByText('Test Incident 1')).toBeInTheDocument();
        expect(screen.getByText('Test Incident 2')).toBeInTheDocument();
    });
});
