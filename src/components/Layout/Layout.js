import React from 'react';
import Aux from '../../hoc/Auxs';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer and BackDrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;