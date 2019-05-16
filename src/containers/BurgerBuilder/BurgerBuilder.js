import React, { Component } from 'react';
import Aux from '../../hoc/Auxs';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	}

	updatePurchase = (ingredients) => {

		const ingredientKeyArray = Object.keys(ingredients);

		console.log(ingredients);

		const valArray = ingredientKeyArray.map((keys) => {
			return ingredients[keys];
		});

		const sum = valArray.reduce((sum, ele) => {
			return sum + ele;
		}, 0);

		this.setState({ purchasable: sum > 0 })
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
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchase(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}

		updatedIngredients[type] = updatedCount;
		const deductionalPrice = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - deductionalPrice;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchase(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelhandler = () => {
		this.setState({ purchasing: false });
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		};

		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandlery}>
					<OrderSummary ingredients={this.state.ingredients}></OrderSummary>
				</Modal>
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;