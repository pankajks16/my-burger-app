import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classes.SideDrawer}>
                <div className={classes.Logo}>
                    <Logo sideDrawer />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;