import React from 'react';
import Aux from '../../hoc/Auxs';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
const layout = (props) => (
    <Aux>
        {/* <div>Toolbar, SideDrawer and BackDrop</div> */}
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout; 