import { InfoFieldContainer } from "./infoFieldContainer"
import { Oval } from "react-loader-spinner"
import { Div, Span } from "./containerComponents"

export const LoaderContainer = () => {

	return (
		<Div
			className = "pegasBody__loaderContainer"
		>
			<Oval
				height={80}
				width={80}
				color="#4fa94d"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel='oval-loading'
				secondaryColor="#4fa94d"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</Div>
	)
}

export const UpLoaderContainer = ({uploadProgress, file, courseTitle}) => {
	console.log( file)
	return (
		<Div
			className = "pegasBody__upLoaderContainer"
		>
			<Div
				className = "pegasBody__mainUpLoaderContainer mainUpLoaderContainer"
			>
				<InfoFieldContainer
					head = "Загрузка"
					classNameForDiv='mainUpLoaderContainer__progressTitleContainer'
					classNameForHead = 'mainUpLoaderContainer__head'
				>
					<Div
						className='mainUpLoaderContainer__progressTitle'
					>
						{ file.name },
					</Div>
					<Div
						className='mainUpLoaderContainer__progressTitle'
					>
						для курса:&nbsp;{ courseTitle }
					</Div>
				</InfoFieldContainer>

				<Div
					className = "mainUpLoaderContainer__progressBarContainer"	
				>
					<Span
						className = "mainUpLoaderContainer__progressNumbers"
						title = {uploadProgress + "%"}
					/>
					
					<Div
						className = "mainUpLoaderContainer__progressBar"
						style = { {width: `${uploadProgress}%`}}
					>
					</Div>
				</Div>

			</Div>

		</Div>
	)
}