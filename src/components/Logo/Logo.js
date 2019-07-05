import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => {
    let ele = <img src={burgerLogo} alt="MyBurger" />;
    if (!props.sideDrawer) {
        ele = <a href="https://www.google.co.in/" target="_blank"  rel="noopener noreferrer">{ele}</a>;
    }

    let totalClasses = null;
    if(props.white) {
        totalClasses = [classes.Logo, classes.White].join(' ');
    } else {
        totalClasses = classes.Logo
    }

    return (
        <div className={totalClasses}>
            {ele}
        </div>
    )
}   

export default logo;