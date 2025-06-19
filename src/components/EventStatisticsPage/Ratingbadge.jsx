import React, { useEffect, useState } from 'react';
import styles from '../../styles/ratingbadge.module.css';

function Ratingbadge({children }) {
    const [bgClass, setBgClass] = useState('');
    useEffect(() => {
        if (children == '0') {
            setBgClass(styles.noRating);
            return;
        }
        const value = parseFloat(children);
        console.log(value);
        if (value > 4.51) {
            setBgClass(styles.highest);
        } else if (value >= 4) {
            setBgClass(styles.good);
        } else if (value >= 3.5) {
            setBgClass(styles.middle);
        } else if (value >= 3) {
            setBgClass(styles.lowermiddle);
        } else {
            setBgClass(styles.lower);
        }
    }, [children])
    
    return (
        <div 
            className={`${styles.ratingBadge} ${bgClass}`}
        >
            {children}
        </div>
    )
}

export default Ratingbadge