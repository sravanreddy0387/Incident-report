import { describe, it, expect, vi } from 'vitest';
import { fetchAllIncidents } from './apiService';
import fakeApi from '../api/fake-api';

vi.mock('../api/fake-api');

describe('apiService', () => {
    it('should fetch, deduplicate, sort and process incidents', async () => {
        const mockLocations = [
            { name: 'Loc1', id: 'loc1' },
            { name: 'Loc2', id: 'loc2' }
        ];

        const mockIncidents1 = [
            { id: 1, name: 'Inc1', priority: 2, datetime: '2023-01-01T10:00:00Z', locationId: 'loc1' },
            { id: 1, name: 'Inc1 Dup', priority: 2, datetime: '2023-01-01T10:00:00Z', locationId: 'loc1' } // Duplicate
        ];

        const mockIncidents2 = [
            { id: 2, name: 'Inc2', priority: 1, datetime: '2023-01-02T10:00:00Z', locationId: 'loc2' }
        ];

        fakeApi.getLocations.mockResolvedValue(mockLocations);
        fakeApi.getIncidentsByLocationId.mockImplementation((id) => {
            if (id === 'loc1') return Promise.resolve(mockIncidents1);
            if (id === 'loc2') return Promise.resolve(mockIncidents2);
            return Promise.resolve([]);
        });

        const result = await fetchAllIncidents();

        expect(result).toHaveLength(2);

        expect(result[0].id).toBe(2);
        expect(result[1].id).toBe(1);

        expect(result[0].locationName).toBe('Loc2');
        expect(result[0].priorityLabel).toBe('High');
        expect(result[0]).toHaveProperty('formattedDate');

        expect(result[1].locationName).toBe('Loc1');
        expect(result[1].priorityLabel).toBe('Medium');
    });
});
