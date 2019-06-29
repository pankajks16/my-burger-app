import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => {
    let ele = <img src={burgerLogo} alt="MyBurger" />;
    if (!props.sideDrawer) {
        ele = <a href="https://www.google.co.in/" target="_blank"  rel="noopener noreferrer"><img src={burgerLogo} alt="MyBurger" /></a>;
    }

    return (
        <div className={classes.Logo}>
            {ele}
        </div>
    )
}

export default logo;