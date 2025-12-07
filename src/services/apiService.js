import fakeApi from '../api/fake-api';
import { format } from 'date-fns';

const PRIORITY_MAP = {
    1: 'High',
    2: 'Medium',
    3: 'Low'
};

export const fetchAllIncidents = async () => {
    try {
        const locations = await fakeApi.getLocations();
        
        const locationNameMap = locations.reduce((acc, loc) => {
            acc[loc.id] = loc.name;
            return acc;
        }, {});
        const incidentPromises = locations.map(loc => 
            fakeApi.getIncidentsByLocationId(loc.id)
        );
        
        const incidentsArrays = await Promise.all(incidentPromises);
        
        const allIncidents = incidentsArrays.flat();

        const uniqueIncidentsMap = new Map();
        allIncidents.forEach(incident => {
            if (!uniqueIncidentsMap.has(incident.id)) {
                uniqueIncidentsMap.set(incident.id, incident);
            }
        });
        const uniqueIncidents = Array.from(uniqueIncidentsMap.values());

        const processedIncidents = uniqueIncidents.map(incident => {
            return {
                ...incident,
                locationName: locationNameMap[incident.locationId] || incident.locationId,
                priorityLabel: PRIORITY_MAP[incident.priority] || 'Unknown',
                formattedDate: new Date(incident.datetime).toLocaleString(),
                description: `This is a mock description for incident ${incident.id}. Action required immediately.`,
                rawDate: new Date(incident.datetime)
            };
        });

        processedIncidents.sort((a, b) => {
            if (a.priority !== b.priority) {
                return a.priority - b.priority;
            }
            return b.rawDate - a.rawDate;
        });

        return processedIncidents;

    } catch (error) {
        console.error("Failed to fetch incidents", error);
        throw error;
    }
};
