import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const myIngredients = Object.keys(props.ingredients);

    let arr = myIngredients.map((myIng) => {
        let sampleArr = [...Array(props.ingredients[myIng])]
        console.log("sample Arr: ", sampleArr);
        return sampleArr.map((_, i) => {
            return <BurgerIngredient key={myIng + i} type={myIng} />
        });
    });

    // let finalArray = arr.reduce((acc, init) => {
    //     return acc.concat(init);
    // }, []);

    let finalArray = arr.flat();

    console.log("arr", arr);
    console.log("final Array : ", finalArray);

    if (finalArray.length === 0) {
        finalArray = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {finalArray}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;