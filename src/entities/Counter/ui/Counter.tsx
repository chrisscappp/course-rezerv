import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/shared/ui/Button"
import { counterActions } from "../model/slice/counterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

export const Counter = () => {

	const dispatch = useDispatch()
	// чтобы action закинуть в reducer
	const counterValue = useSelector(getCounterValue)

	const increment = () => {
		dispatch(counterActions.increment())
	}

	const decrement = () => {
		dispatch(counterActions.decrement())
	}

	return (
		<div>
			<h1 data-testid = "counter-value">
				value = {counterValue}
			</h1>
			<Button 
				onClick = {increment}
				data-testid = "increment-btn"
			>
				increment
			</Button>
			<Button 
				onClick = {decrement}
				data-testid = "decrement-btn"
			>
				decrement
			</Button>
		</div>
	)
}