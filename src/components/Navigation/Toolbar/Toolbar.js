import React from 'react';

import classes from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>Hello</div>
            <div>Pankaj</div>
            <div>{classes.Toolbar}</div>
            <nav>
                ...
            </nav>
        </header>

    );
}

export default toolbar;