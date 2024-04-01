import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CourseService from "../../services/course"
import * as pdfjs from "pdfjs-dist"
import * as worker from "/node_modules/pdfjs-dist/build/pdf.worker.min.mjs"

import { PdfField } from "../../components/componentsForPages/componentsForPdf/pdfField"

import { LoaderContainer } from "../../components/componentsForStructure/componentsContainer/loaderContainer"

import "../../styles/pdf/pdfViewPage.scss"

const PdfPage = () => {
	console.log( "render Pdf Page .... .... ..... ")
	// pdfjs.GlobalWorkerOptions.workerSrc = worker;
	// pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	pdfjs.GlobalWorkerOptions.workerSrc = "../../../public/lib/pdf.worker.mjs";

	
	let course = useRef( {id: null, title: ""} );
	const [ downloadState, setDownloadState ] = useState( 0 )
	const [ loader, setLoader ] = useState( true )
	// const location = useOutletContext()
	const location = useLocation()
	const navigate = useNavigate();
	const [docInfo, setDocInfo] = useState({
		doc: null,
		numPages: 0,
		error: null
	})

	
	
	const getPdf = async ( id ) => {
		try {
			// setLoader( true )
			console.log( "get pdf ... ... ... ... ... ... .. .")
			const response = await CourseService.getPdfFileForViewer( id, (e) => {
				const { progress } = e				
				
				setDownloadState(Math.ceil(progress.toFixed(2) * 100))
			})
			
			if (response.statusText === "OK") {
				const reader = new FileReader();
				reader.readAsDataURL( response.data)				
				reader.onload = async () => {
					const doc = await pdfjs.getDocument({ url: reader.result, disableStream: true }).promise
					const { numPages } = doc;
					doc.cleanup(true)
					setDocInfo( prev => ( {...prev, doc, numPages }) )
				}	
			}
			else {
				throw new Error( "Что то пошло не так")
			}
		}
		catch (e) {
			setDocInfo( prev => ( { ...prev, error: e.message, numPages: 0 } ) )
		}
		finally {
			setDownloadState( 0 )
			setLoader( false )
		}
	}

	useEffect(() => {
		console.log( 'pdf page render from useEffect ./////////////////')
		
		if (location.search) {
			const string = location.search[0] === "?" ? (location.search.slice(1) ) : location.search
			course.current =  Object.fromEntries(string.split("&").map(it => it.split("="))) 
			
			console.log( course.current )
		}
		
		if (course.current && course.current.id) {
			try {
				getPdf(course.current.id)
			}
			catch (e) {
				console.log(e)
			}
		}
		else { 
			navigate( "/errorPage", { replace: true} )
		}
	}
		, [ ]
	)
	
	if (loader) return <LoaderContainer />
	else
	return (
			<PdfField
				course = { course.current	 }
				docInfo = { docInfo }
				downloadState = { downloadState }
			/>
	)
}
export default PdfPage