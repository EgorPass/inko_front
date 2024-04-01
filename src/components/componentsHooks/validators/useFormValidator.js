

export const useFormValidator = () => {

	const textValidator = (str) => {
		const res = str.startsWith(" ") || (str.length <= 1)
		return !res
	}
	 
	const emailValidator = str => {
		const res = str.includes("@")
		return res
	}
	
	const doubleTitleValidator = (arr, func) => {
		arr.forEach(func)
	}

	const compareValidatorForCoursesAndSubjects = (field, globalState, changeState) => {
		
		return ( ({ id, title }) => {
			
			const ifNewFeild = !globalState && (changeState.title.trim() === title)
			const ifOldField = (globalState && (globalState.id !== id) ) && ( changeState.title.trim() === title)
			if( ifNewFeild || ifOldField )
				throw new Error(`${field} "${changeState.title}" уже существует`)
		})

	}

	const compareValidatorForUser = (globalState, changeState) => {
		return (({ email, id }) => {
			const ifNewFeild = !globalState && ( changeState.email === email )
			const ifOldField = (globalState && (globalState.id !== id)) && (changeState.email === email )
			if( ifNewFeild || ifOldField )
				throw new Error(`Пользователь с почтой "${changeState.email}" уже существует`)
		})

	}

	return {
		doubleTitleValidator,
		emailValidator,
		textValidator,

		compareValidatorForUser,
		compareValidatorForCoursesAndSubjects
	}
}
