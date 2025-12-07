import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';
import { fetchAllIncidents } from '../services/apiService';

vi.mock('../services/apiService');

const mockIncidents = [
    {
        id: 1,
        priority: 1,
        name: 'Dashboard Incident',
        formattedDate: '1/1/2023',
        priorityLabel: 'High',
        locationName: 'Dashboard Loc',
        description: 'Dashboard Desc'
    }
];

describe('Dashboard', () => {
    it('renders loading state initially', () => {
        fetchAllIncidents.mockReturnValue(new Promise(() => {}));
        render(<Dashboard />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders incidents after fetching', async () => {
        fetchAllIncidents.mockResolvedValue(mockIncidents);
        render(<Dashboard />);
        
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });

        expect(screen.getAllByText('Dashboard Incident')).toHaveLength(2); 
    });

    it('renders error state on failure', async () => {
        fetchAllIncidents.mockRejectedValue(new Error('Failed'));
        render(<Dashboard />);
        
        await waitFor(() => {
            expect(screen.getByText(/failed to load incidents/i)).toBeInTheDocument();
        });
    });
});
