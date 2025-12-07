import PropTypes from 'prop-types';
import styles from '../styles/Styles.module.css';
import PriorityIcon from './PriorityIcon';

const ListComponent = ({ incidents }) => {
    return (
        <div className={styles.listContainer}>
            {incidents.map(incident => (
                <div key={incident.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <PriorityIcon priority={incident.priority} />
                        <span>{incident.formattedDate}</span>
                    </div>
                    
                    <div className={styles.mobileRow}>
                        {incident.locationName}
                    </div>

                    <div className={styles.mobileRow}>
                        <strong>{incident.name}</strong>
                    </div>

                     <div className={styles.mobileDescription}>
                        {incident.description}
                    </div>
                </div>
            ))}
        </div>
    );
};

ListComponent.propTypes = { 
    incidents: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            priority: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            formattedDate: PropTypes.string.isRequired,
            priorityLabel: PropTypes.string.isRequired,
            locationName: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ListComponent;
