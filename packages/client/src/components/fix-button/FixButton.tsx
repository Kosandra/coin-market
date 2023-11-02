import React from 'react';
import styles from '../styles.module.scss';
import {Link} from 'react-router-dom';
import {FixButtonArgs} from "components/FixButtonTypes";

const FixButton = (props: FixButtonArgs) => {
    const {toPage, text, onClick, variant} = props;
    const getClassNames = () => {
        let classes = `${styles.fix_button_container} `;
        switch (variant) {
            case "primary":
                break;
            case "right_bottom":
                classes += `${styles.fix_btn_bottom_right}`;
                break;
            default:
                return classes;
        }
        return classes;
    };

    return (
        <div className={getClassNames()}>
            <Link
                to={toPage || '#'}
                className={styles.fix_button}
                onClick={onClick}
            >
                {text}
            </Link>
        </div>
    );
};

export default FixButton;
