import { createContext, useContext } from "react";

const ContextForSimpleField = createContext();

export const SimpleFieldContext = ({ children, data }) => {
	return (
		<ContextForSimpleField.Provider value={data} >
			{ children }
		</ContextForSimpleField.Provider>
	)
}
export const useSimpleFieldContext = () => useContext(ContextForSimpleField)