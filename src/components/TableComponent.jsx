import PropTypes from 'prop-types';
import styles from '../styles/Styles.module.css';

const TableComponent = ({ incidents, columns }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} style={col.style}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {incidents.map(incident => (
                        <tr key={incident.id}>
                            {columns.map((col, index) => (
                                <td key={index}>
                                    {col.render ? col.render(incident) : incident[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TableComponent.propTypes = {
    incidents: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
            render: PropTypes.func,
            style: PropTypes.object
        })
    ).isRequired
};

export default TableComponent;
