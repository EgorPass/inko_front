import { useGetStore } from "../../../../redux/reduxHooks/useGetStore"
import { useEffect } from "react"
import { Div, Span } from "../../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleButton , DefaultInput } from "../../../componentsForStructure/componentsForForm/componentForForm"
import { usePdfHeaderHooks } from "../../../componentsHooks/pdfViewerHooks/usePdfHeaderHooks"

import "../../../../styles/pdf/pdfViewHeader.scss"

export const PdfHeader = ({
	// setLoader,
	numPages,		title, id,
	zoom,				setZoom,
	scrollTop,	scrollHeight,

	pageNumber = 0,
	setPageNumber = () => { },
	setFullScreen, fullScreen,

	peaceData, containerRef, 

	downloadState,
}) => {
	
	const { userRoles } = useGetStore("user");

	const {
		loaderRef,

		focus,
		pageIndexRef,
		handleChangePageAtClick,
		handleChangeZoom,
		handleChangeFullScreen,
		handleSetFocusAtInput,
		handleSetBlurAtInput,
		handleKeyDown,
		handleDownloadFile,

	} = usePdfHeaderHooks({
													numPages, 	id,				title,		
													zoom, 			setZoom,	setFullScreen, 
													scrollTop, 	scrollHeight,
													pageNumber, setPageNumber,
													peaceData, 	containerRef								
	})

	const buttonDisabled = numPages === 0
	
	useEffect(() => {
		if (pageIndexRef.current) {
			pageIndexRef.current.focus( )
		}
	}
		, [ focus ]
	)
	
	useEffect(() => {
		if (loaderRef.current) {
			loaderRef.current.style.width = downloadState + "%"
		}
	}
		,[ downloadState ]
	)


	return (

		<Div
			className="pdfViewer__headerContainer"
		>
			<Div
				className = "pdfViewer__pageNavigator"
			>
				<Div
					className = "pdfViewer__navigatorButtonBox"
				>
					<SimpleButton
						
						title = ""
						className="pdfViewer__menuButton pdfViewer__menuButton_minusPage"
						disabled = { buttonDisabled }
						handleClick={handleChangePageAtClick}
						alt = "вниз"
					/>

					<SimpleButton
						
						title = ""
						className="pdfViewer__menuButton pdfViewer__menuButton_plusPage"
						disabled = { buttonDisabled }
						handleClick={handleChangePageAtClick}
						alt = "вверх"
					/>
					
				</Div>

				<Div
					className = "pdfViewer__indexNavigator"
				>
					{
						focus ? (

							<DefaultInput
								defaultValue = { pageNumber }
								onBlur = { handleSetBlurAtInput }
								onKeyDown = { handleKeyDown }
								ref = { pageIndexRef }
								className = 'pdfViewer__pageIndexInput'
							/>
						) : (
								<Div
									className = "pdfViewer__pageIndex"
									handleClick = { handleSetFocusAtInput }
								>
									{ pageNumber  }
								</Div>
							)
					}
					<Span
						title = "/"
					/>
					<Div
						className="pdfViewer__pageSum"
					>
						{ numPages}
						</Div>
				</Div>
				
			</Div>

			<Div
				className = "pdfViewer__headerTitleContainer"
			>
				<h4
					className = "pdfViewer__head"
				>
					{ title }
				</h4>
				<div
					ref = { loaderRef }
					className = "pdfViewer__loadingBar"
				></div>
			</Div>
			
			<Div
				className = 'pdfViewer__zoomNavigator'
			>
				
				<SimpleButton
					
					title = ""
					className = "pdfViewer__menuButton pdfViewer__menuButton_zoomDown"
					disabled = { buttonDisabled }
					handleClick = { handleChangeZoom }
					alt = "уменьшить размер"
				/>
				<SimpleButton
					
					title = ""
					className = "pdfViewer__menuButton pdfViewer__menuButton_zoomUp"
					disabled = { buttonDisabled }
					handleClick = { handleChangeZoom }
					alt = "увеличить размер"
				/>
				<SimpleButton
					
					title = ""
					className = "pdfViewer__menuButton pdfViewer__menuButton_heightResize"
					disabled = { buttonDisabled }
					handleClick = { handleChangeZoom }
					alt = "размер по высоте"
				/>
				<SimpleButton
					
					title = ""
					className = "pdfViewer__menuButton pdfViewer__menuButton_widthResize"
					disabled = { buttonDisabled }
					handleClick = { handleChangeZoom }
					alt = "размер по ширине"
				/>
				<SimpleButton
					
					title = ""
					className = "pdfViewer__menuButton pdfViewer__menuButton_fullScreen"
					disabled = { buttonDisabled }
					handleClick = { handleChangeFullScreen }
					alt = { `${fullScreen ? "вид в окне" : "вид во весь экран"}` }
				/>

			</Div>

			<Div
				className = "pdfViewer__dataNavigator"
			>

				<SimpleButton
					
					title = ""
					className = "pdfViewer__menuButton pdfViewer__menuButton_saveFile"
					// disabled = { buttonDisabled }
					handleClick = {			handleDownloadFile				}
					alt = "сохранить"
					disabled = { !userRoles.includes(1000011) || buttonDisabled }
				/>

			</Div>
			
		</Div>
	)
}