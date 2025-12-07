import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableComponent from './TableComponent';

const mockIncidents = [
    {
        id: 1,
        priority: 1,
        name: 'Test Incident 1',
        formattedDate: '1/1/2023, 10:00:00 AM',
        priorityLabel: 'High',
        locationName: 'Test Location',
        description: 'Test Description 1'
    },
    {
        id: 2,
        priority: 2,
        name: 'Test Incident 2',
        formattedDate: '1/2/2023, 11:00:00 AM',
        priorityLabel: 'Medium',
        locationName: 'Another Location',
        description: 'Test Description 2'
    }
];


const mockColumns = [
    { header: 'Header 1', accessor: 'name' },
    { header: 'Header 2', accessor: 'locationName' },
    { header: 'Header 3', accessor: 'formattedDate' },
    { 
        header: '', 
        accessor: 'priority',
        render: (row) => <img alt="Priority" /> 
    }
];

describe('TableComponent', () => {
    it('renders correct number of rows', () => {
        render(<TableComponent incidents={mockIncidents} columns={mockColumns} />);
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(3); 
    });

    it('renders incident details correctly', () => {
        render(<TableComponent incidents={mockIncidents} columns={mockColumns} />);
        
        expect(screen.getByText('Test Incident 1')).toBeInTheDocument();
        expect(screen.getByText('Test Location')).toBeInTheDocument();
        expect(screen.getByText('1/1/2023, 10:00:00 AM')).toBeInTheDocument();

        const images = screen.getAllByRole('img');
        expect(images[0]).toBeInTheDocument();
    });

    it('renders empty table when no incidents provided', () => {
        render(<TableComponent incidents={[]} columns={mockColumns} />);
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(1);
    });

    it('applies custom styles to column headers', () => {
        const columnsWithStyle = [
            { header: 'Styled Header', accessor: 'name', style: { width: '100px', color: 'red' } }
        ];
        render(<TableComponent incidents={mockIncidents} columns={columnsWithStyle} />);
        
        const header = screen.getByText('Styled Header');
        expect(header.style.width).toBe('100px');
        expect(header.style.color).toBe('red');
    });
});
