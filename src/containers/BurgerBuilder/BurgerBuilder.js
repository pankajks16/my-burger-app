import React, { Component } from 'react';
import Aux from '../../hoc/Auxs/Auxs';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.8,
	cheese: 1.1,
	bacon: 1.5,
	meat: 2.1
}

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	updatePurchase = (ingredients) => {
		const ingredientKeyArray = Object.keys(ingredients);
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

	purchaseContinueHandler = () => {
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice.toFixed(2),
			customer: {
				name: "Pankaj Kumar Singh",
				address: {
					street: "Jakkur 9th B cross",
					zipCode: '560064',
					country: 'India'
				},
				email: "pankajks16@gmail.com"
			},
			deliveryMethod: 'express service'
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false, purchasing: false });
			})
			.catch(err => {
				this.setState({ loading: false, purchasing: false });
			});
	}

	componentDidMount() {
		axios.get('https://react-burger-app-789.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data });
				console.log("Success");
			})
			.catch(err => {
				console.log("Error");
				this.setState({ error: true })
			});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		};

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded !!!</p> : <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						price={this.state.totalPrice}
						ordered={this.purchaseHandler}
					/>
				</>
			)
			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				purchaseCancelled={this.purchaseCancelhandler}
				purchaseContinued={this.purchaseContinueHandler}
				price={this.state.totalPrice}
			></OrderSummary>
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);