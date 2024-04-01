import {useState, useRef } from "react"
import CourseService from "../../../services/course"

import { useButtonHook } from "../formHooks/useButtonHook"

export const usePdfHeaderHooks = ({ 
	setLoader,
	numPages,	 	id, 						title,
	zoom, 			setZoom,				setFullScreen,
	pageNumber, setPageNumber,
	containerRef,	peaceData,		scrollTop, 	scrollHeight,
}) => {

	const loaderRef = useRef( null )
	const [ downloadState, setDownLoadState ] = useState( false )
	const pageIndexRef = useRef(null)
	const [ focus, setFocus ] = useState( false )
	
	// const { wrapperClick } = useButtonHook( setLoader )

	const handleChangePageAtClick = (e) => {
		e.preventDefault()

		const target = e.target;
		if (!target || !target.className) return;

		let newIndex;
		if ( target.className.endsWith("minusPage") ) {
			newIndex = pageNumber - 1 
			if (newIndex < 1) return
		}
		if( target.className.endsWith("plusPage") ) {
			newIndex = pageNumber + 1 
			if (newIndex > numPages) return 
		}
		
		const anch = document.createElement( "a")
		anch.href = `#canvas-pageAnchor-${newIndex }`
		anch.click();

		setPageNumber(newIndex)		
	}

	const handleSetFocusAtInput = (e) => {
		e.preventDefault();
		setFocus(true);
	}
	
	const handleSetBlurAtInput = (e) => {
		setFocus(false)
	}

	const handleKeyDown = (e) => {
		const keyCode = e.keyCode;
		let value = e.target.value 
		
		if (!value) value = '';
		
		if (keyCode === 13) {
			const anch = document.createElement("a")
						anch.href = `#canvas-pageAnchor-${ value }`
						anch.click();
						setPageNumber( value )
		}
		else
			if(
				keyCode === 8 || keyCode === 46 ||
				keyCode === 37 || keyCode === 39 ||
				( 47 < keyCode && keyCode < 58 ) || ( 95 < keyCode && keyCode < 106 )
			) { 
		}
		else {
			e.preventDefault()
		}			
	}

	const handleChangeZoom = (e) => {
		e.preventDefault();
		
		const target = e.target;
		if (!target || !target.className) return;
	
			let newZoom;
		
		if( target.className.endsWith( "zoomDown" ) )	newZoom = zoom - .025
		if( target.className.endsWith( "zoomUp" ) ) newZoom = zoom + .025
		if( target.className.endsWith( "widthResize" ) ) newZoom = 1
		if( target.className.endsWith( "heightResize" ) ) {
			
			const  { canvas } = peaceData.current[ pageNumber - 1 ]
		
			if( !canvas ) return
		
			const scrollContainer = containerRef.current.parentNode;

			const containersWidth = scrollContainer.clientWidth;
			const containersHeight = scrollContainer.clientHeight + 16;
			
			const pageWidth = canvas.width;
			const pageHeight = canvas.height;

			const kP = pageWidth / pageHeight
			const kC = containersWidth / containersHeight

			if (isNaN(kP) || isNaN(kC)) newZoom = .5
			else newZoom = 1 / ( kC / kP )
		}

			scrollHeight.current = containerRef.current.parentNode.scrollHeight
			scrollTop.current = containerRef.current.parentNode.scrollTop
		
		setZoom(newZoom)
		// console.log( "zoom at useStateHeader:", zoom )
	}

	const handleChangeFullScreen = (e) => {
		e.preventDefault();
		setFullScreen( prev => !prev )
	}

	const handleDownloadFile = async ( e ) => {
		e.preventDefault()
		try {
			if (!downloadState) {
				setDownLoadState( true )
			
				const response = await CourseService.getPdfFileForViewer(id, (e) => {
					const { progress } = e
					loaderRef.current.style.width = Math.ceil(progress.toFixed(2) * 100) + "%"					
				})
				
				if (response.statusText === "OK") {	
				
					const anch = document.createElement("a");
					anch.href = URL.createObjectURL( response.data )
					anch.download = `${title}.pdf`
					anch.click();
					URL.revokeObjectURL( anch.href )
					loaderRef.current.style.width = "0%"
				}
				setDownLoadState( false )
			}
		}
		catch (e) {
			console.log( e.message)
		}
	}
	
	return {
		// wrapperClick,
		loaderRef,
		focus, pageIndexRef,
		handleChangePageAtClick,
		handleChangeZoom,
		handleChangeFullScreen,
		handleSetFocusAtInput,
		handleSetBlurAtInput,
		handleKeyDown,
		handleDownloadFile,
	}
}