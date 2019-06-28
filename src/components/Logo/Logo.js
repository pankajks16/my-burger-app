import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <a href="https://www.google.co.in/" target="_blank"  rel="noopener noreferrer"><img src={burgerLogo} alt="MyBurger" /></a>
        </div>
    )
}

export default logo;