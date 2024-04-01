import { useState } from "react";

export const useTextInputHook = (initialState = null ) => {
	const [ textInputState, setState ] = useState( initialState )

	const handleChangeTextInputState = (e) => {
		const target = e.target;
		if (!target) return;
		const name = target.name;
		if (!name) return
		
		setState(prev => ({
			...prev,
			[name]: target.value
		}))
	}

	const resetTextInputState = () => {
		setState(initialState)
	}

	const changeInputState = (prop, value) => {
		setState(prev => ({
			...prev,
			[prop] : value,
		}))
	}


	return {
		textInputState,
		changeInputState,
		resetTextInputState,
		handleChangeTextInputState,
	}
}

export const useCheckboxInputHook = (initialState = []) => {
	
	const [ checkboxInputState, setState ] = useState( initialState )

	const handleChangeCheckboxInputState = (e) => {

		const target = e.target;
		if( !target ) return;
		const courseId = target.dataset.id
		if( !courseId ) return;
			
		if (!checkboxInputState.includes(+courseId))
			setState(prev => [...prev, +courseId])
		else 
			setState( prev => prev.filter( it => it !== +courseId ))
	}
 
	const resetCheckboxInputState = () => {
		setState(initialState)
	}

	return {
		checkboxInputState,
		resetCheckboxInputState,
		handleChangeCheckboxInputState
	}
}

