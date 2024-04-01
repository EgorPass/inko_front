import { useEffect } from "react"
import { isNumber } from "../../../componentsHooks/pdfViewerHooks/usePdfState"
import { usePdfGetPagesHooks } from "../../../componentsHooks/pdfViewerHooks/usePdfGetPagesHooks"
import { Div } from "../../../componentsForStructure/componentsContainer/containerComponents"

export const ViewPages = ({
	docInfo,		zoom,					setPageNumber,
	peaceData,	containerRef,	htmlCollection,
	loadReady, 	setLoadReady,
}) => {
	
	const { 
		buildPagesData, handleScrollContainer,
		createPageNode, createHtmlCollectionAtContainer,
	} = usePdfGetPagesHooks({ 
		doc: docInfo.doc,		
		peaceData,		htmlCollection,
		containerRef,	setPageNumber,
		loadReady, setLoadReady,
		isNumber,
	})

	useEffect(() => {
		buildPagesData( {	numPages: docInfo.numPages,	scale: 2,	className: "canvas-page" } )
	}	,[ docInfo.doc ] ) 

	useEffect(() => {
		if (peaceData.current.length > 0) {
			
			createHtmlCollectionAtContainer(
				createPageNode,
				"pdfViewer__pagesListItem",
				)
		}
	}
		,[ peaceData.current.length ]
	)
	
	return (
		<Div
			className = "pdfViewer__viewerContainer"
		>
			<Div
				className = "pdfViewer__scrollContainer"
				onscroll={ handleScrollContainer }
			>			
				<ul
					style = {{
						width:  ( (zoom * 100) + "%" ),
					}}
					ref = { containerRef }
					className = "pdfViewer__zoomerContainer"
					>
				</ul>	
				{
					docInfo.error && (
						<div
							ref= { containerRef }
							className="pdfViewer__errorContainer"
						>							
							{ docInfo.error }
						</div>
					)
				}
			</Div>
		</Div>
	)
}