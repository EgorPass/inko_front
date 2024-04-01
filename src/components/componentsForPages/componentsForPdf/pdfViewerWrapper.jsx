import {  useEffect } from "react"
import { usePdfState, usePdfZoomScrollState, isNumber } from "../../componentsHooks/pdfViewerHooks/usePdfState"
import { Div } from "../../componentsForStructure/componentsContainer/containerComponents"

import { ViewThumbs } from "./viewThumbs/viewThumbs"
import { ViewPages } from "./viewPages/viewPages"
import { PdfHeader } from "./header/pdfHeader"


export const PdfViewerWrapper = ({ docInfo, title, id, downloadState, setLoader } ) => {
	
	const { 
		peaceData, containerRef, htmlCollection,
		loadReady, setLoadReady,
	} = usePdfState()

	const {
		scrollTop, 	scrollHeight,
		zoom,				setZoom,
		fullScreen, setFullScreen,
		pageNumber,	setPageNumber,
	} = usePdfZoomScrollState( { state: !!docInfo.doc})

	useEffect(() => { 
		
		if (containerRef.current && containerRef.current.parentNode) {	
			scrollHeight.current = containerRef.current.parentNode.scrollHeight;
			scrollTop.current = containerRef.current.parentNode.scrollTop;
		}
	}
		, [ loadReady.ready, ]
	)
 
	useEffect(() => {
		const percent = ( scrollTop.current * 100 ) / scrollHeight.current
		const newHeight = containerRef.current.parentNode.scrollHeight
		const newTop = 	( newHeight * percent ) / 100 

		if( containerRef.current && containerRef.current.parentNode && isNumber( newTop ) ) {
			containerRef.current.parentNode.scrollTop = newTop
		}
	}
		, [ zoom ]
	)

	return (
		<Div
			className={`pdfViewer__mainContainer pdfViewer__mainContainer_${fullScreen ? "fullScreen" : "mainScreen"}`}
		>			
			<ViewThumbs
				doc = { docInfo.doc }
				numPages = { docInfo.numPages }
			/>
			<PdfHeader
				id = { id }
				title = { docInfo.doc ? title : '' }
				
				containerRef = { containerRef }
				peaceData = { peaceData}
				
				numPages = { docInfo.numPages }
				pageNumber = { pageNumber}
				
				setPageNumber = { setPageNumber }
				
				zoom = { zoom }
				setZoom = { setZoom }
				fullScreen = { fullScreen }	
				setFullScreen = { setFullScreen }
				scrollTop = { scrollTop }
				scrollHeight = { scrollHeight }
				downloadState = { downloadState }
				// setLoader = { setLoader }
			/>
			<ViewPages
				docInfo = { docInfo }
				zoom = { zoom }
				
				numPages = { docInfo.numPages }
				setPageNumber = { setPageNumber }
				
				peaceData = { peaceData }
				
				loadReady = { loadReady }
				setLoadReady = { setLoadReady}
				
				containerRef = { containerRef }
				htmlCollection = { htmlCollection }
			/>
		</Div>
	)
}