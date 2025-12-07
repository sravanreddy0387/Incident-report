import { useEffect, useState } from 'react';
import { fetchAllIncidents } from '../services/apiService';
import TableComponent from './TableComponent';
import ListComponent from './ListComponent';
import styles from '../styles/Styles.module.css';
import PriorityIcon from './PriorityIcon';  

const Dashboard = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        {
            header: '',
            accessor: 'priority',
            render: (row) => <PriorityIcon priority={row.priority} />,
            style: { width: '40px' }
        },
        { header: 'Date and Time', accessor: 'formattedDate' },
        { header: 'ID', accessor: 'id' },
        { header: 'Location Name', accessor: 'locationName' },
        { header: 'Incident Name', accessor: 'name' },
        { header: 'Description', accessor: 'description' }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAllIncidents();
                setIncidents(data);
            } catch (err) {
                setError("Failed to load incidents.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div className={styles.container}>Loading incidents...</div>;
    if (error) return <div className={styles.container}>{error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Incidents Dashboard</h1>
            <TableComponent incidents={incidents} columns={columns} />
            <ListComponent incidents={incidents} />
        </div>
    );
};

export default Dashboard;
