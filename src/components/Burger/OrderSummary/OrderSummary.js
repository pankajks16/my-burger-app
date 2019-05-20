import React from 'react';

import Aux from '../../../hoc/Auxs';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientObj = props.ingredients;

    const ingredientSummary = Object.keys(ingredientObj)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredientObj[igKey]}
                </li>
            );
        });

    return (
        <Aux>
            <h3>Your Orders:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;