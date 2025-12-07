import PropTypes from 'prop-types';
import styles from '../styles/Styles.module.css';
import HighIcon from '../assets/alarm-high.svg';
import MediumIcon from '../assets/alarm-medium.svg';
import LowIcon from '../assets/alarm-low.svg';

const PriorityIcon = ({ priority }) => {
    let iconSrc;
    let altText;    

    switch (priority) {
        case 1:
            iconSrc = HighIcon;
            altText = 'High Priority';
            break;
        case 2:
            iconSrc = MediumIcon;
            altText = 'Medium Priority';
            break;
        case 3:
            iconSrc = LowIcon;
            altText = 'Low Priority';
            break;
        default:
            return null;
    }

    return <img src={iconSrc} alt={altText} className={styles.priorityIcon} />;
};

PriorityIcon.propTypes = {
    priority: PropTypes.number.isRequired,
};

export default PriorityIcon;
