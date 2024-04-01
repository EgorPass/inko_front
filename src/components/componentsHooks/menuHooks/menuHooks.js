import { useState } from "react";

export const useToggleMenu = ( tabs, initialState = tabs[0] ) => {

	const [tab, setTab] = useState( initialState )
	
	const handleClickToTab = (e) => {
		const target = e.target
			if (!target) return;
		const data = target.dataset.id;
			if (!data) return;
		setTab(data)
	}

	return {
		tab, tabs, handleClickToTab
	}
}