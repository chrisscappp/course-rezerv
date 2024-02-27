import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputActions } from "../model/slice/inputSlice";
import { getInputValue } from "../model/selectors/getInputValue/getInputValue";

export const Input = () => {

	const dispatch = useDispatch()
	const value = useSelector(getInputValue)

	const changeValue = (e: any) => {
		dispatch(inputActions.changeValue(e.target.value))
	}

	return (
		<div>
			<input type="text" 
				onChange = {changeValue}
			/>
			<h3>{value}</h3>
		</div>
	)
}