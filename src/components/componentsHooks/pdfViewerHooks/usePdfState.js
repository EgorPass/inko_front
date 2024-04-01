import { useState, useRef } from "react"

export const usePdfState = () => {
	
	const peaceData = useRef( [ ] )
	const containerRef = useRef( null );
	const htmlCollection = useRef( [ ] )
	const [loadReady, setLoadReady] = useState({
		ready: false,
		load: false,
	})

	return {
		peaceData, containerRef, htmlCollection,
		loadReady, setLoadReady,
	}
}

export const usePdfZoomScrollState = ({ state }) => {
	const scrollTop = useRef( 0 ) 
	const scrollHeight = useRef( 0 )
	
	const [ zoom, setZoom ] = useState(.5)
	const [ fullScreen, setFullScreen ] = useState( false )
	
	const [ pageNumber, setPageNumber ] = useState( state ? 1 : 0 )

	return {
		scrollTop, 	scrollHeight,
		zoom,				setZoom,
		fullScreen, setFullScreen,
		pageNumber,	setPageNumber,
	}
}

export const isNumber = ( num ) => ( !isNaN( parseFloat( num ) ) && isFinite( num ) )