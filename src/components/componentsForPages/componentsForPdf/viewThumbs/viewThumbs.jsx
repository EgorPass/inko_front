import { useEffect, memo } from "react";
import { Div } from "../../../componentsForStructure/componentsContainer/containerComponents";
import { usePdfGetPagesHooks } from "../../../componentsHooks/pdfViewerHooks/usePdfGetPagesHooks";
import { usePdfState, isNumber } from "../../../componentsHooks/pdfViewerHooks/usePdfState";

export const ViewThumbs = memo(
	( { doc, numPages } ) => {
	
	const { 
		peaceData, containerRef, htmlCollection,
		loadReady, setLoadReady,
	} = usePdfState()
		
	const {

		buildPagesData,		handleScrollContainer,		createHtmlCollectionAtContainer,
		createThumbNode, 	 

	} = usePdfGetPagesHooks({
		doc,				containerRef,
		peaceData,	htmlCollection,
		loadReady,	setLoadReady,
		isNumber,
	})

	useEffect( ( ) => {
		buildPagesData(	{	numPages,	scale: .3, className: "thumbs-page", } )
	}	, [ doc ] ) 

	useEffect(() => {
		createHtmlCollectionAtContainer(
			createThumbNode,

			'pdfViewer__thumbsListItem',
		)
	}
		, [ peaceData.current.length ]
	)

	return (
		<Div
			className = "pdfViewer__thumbsContainer"
		>
			<Div
				className = "pdfViewer__scrollContainer"
				onscroll = { handleScrollContainer }
			>
				<ul
					ref = { containerRef }
					className = "pdfViewer__thumbsListsContainer"
				></ul>
			</Div>
		</Div>
	)
	}
)