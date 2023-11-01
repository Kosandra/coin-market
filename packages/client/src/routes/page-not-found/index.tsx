import React from 'react';
import {useLocation} from 'react-router-dom';
import styles from './styles.module.scss';
import FixButton from '../../components/fixButton/FixButton';

const PageNotFound = () => {
    const navigator = useLocation();
    return (
        <div className={styles.page}>
            <div className={styles.page_content}>
                <div className={styles.not_found}>
                    <FixButton text={'Back'} toPage={'/'}/>
                    Not found page with pathname <span>{navigator.pathname}</span>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
