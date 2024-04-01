import { PdfViewerWrapper } from "./pdfViewerWrapper"

export const PdfField = ({ course, docInfo, downloadState }) => {
	console.log( "render pdf field -- -- -- -- -- -- -- --")
	
	
	
	return (
		<main
			className = "pegasBody__pdfViewer pegasBody__pdfViewer pdfViewer"
		>
			<PdfViewerWrapper
				id = { course.id }
				title = { decodeURI( course.title ) }
				doc = { docInfo.doc }
				docInfo = { docInfo }
				downloadState = { downloadState }
			/>
		</main>
	)
}