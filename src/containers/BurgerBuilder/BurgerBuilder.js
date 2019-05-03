import React, { Component } from 'react';
import Aux from '../../hoc/Auxs';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
	salad: 0.8,
	cheese: 1.1,
	bacon: 1.5,
	meat: 2.1
}



class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			cheese: 0,
			bacon: 0,
			meat: 0
		},
		totalPrice: 4
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}

		updatedIngredients[type] = updatedCount;
		const additionalPrice = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + additionalPrice;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients});
	}

	removeIngredientHandler = (type) => {

	}

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredientHandler} 	
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;