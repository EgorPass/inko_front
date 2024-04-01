import { Div, Span, Label } from "../../../../componentsForStructure/componentsContainer/containerComponents"

import  imagePdf  from "./imagePdf.png"
import { SimpleButton, SimpleInput } from "../../../../componentsForStructure/componentsForForm/componentForForm"

export const FileDataContainer = ({
	fileName,
	courseChange,
	handleClickAddFile,
	handleClickRemoveFile,
}) => {

	return (
		<Div
			className="createCourseContainer__fileDataContainer"
		>
			<Div
				className={`createCourseContainer__fileContainer`}
			>
				{
					(courseChange && courseChange.isexist)
						?
					(
						<>
							<SimpleButton
								title="Удалить pdf"
								className="adminPage__button adminPage__button_remove"
								handleClick={handleClickRemoveFile}
							/>
							<Div
								className="createCourseContainer__courseFileBox"
							>
								<img
									className="createCourseContainer__imagePdf"
									src={imagePdf}
									alt="pdf"
								/>
							</Div>
						</>
					)
						:
					(
						<Label
							className="createCourseContainer__courseFileDataLabel"
						>
							<Div
								className="createCourseContainer__courseFileDataButton createCourseContainer__courseFileDataButton_add"		
							>
								<Span
									title="Добавить pdf"
									className="createCourseContainer__courseFileDataButton_title"
								/>
							</Div>		
							<SimpleInput
								type="file"
								name="courseFileData"
								className="createCourseContainer__courseFileData "
								handleChange={handleClickAddFile}
							/>
						</Label>
					)
				}
			</Div>
			<Div
				className={`createCourseContainer__fileName`}
			>
				{ fileName }
			</Div>
		</Div>
	)
}