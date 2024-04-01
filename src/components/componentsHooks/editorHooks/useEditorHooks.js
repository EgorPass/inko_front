import { useState, useRef } from "react"
import { EditorState, ContentState, convertFromHTML } from "draft-js"

export const useEditorHook = (initialData) => {
	
	const dataFromHtml = convertFromHTML(initialData )
	const newState = ContentState.createFromBlockArray(
		dataFromHtml.contentBlocks,
		dataFromHtml.entityMap
	)
	const createEditorState = () => EditorState.createWithContent(newState)
	const [editorState, setEditorState] = useState(createEditorState())
	const editRef = useRef(null)
	
	const resetEditorState = () => {
		setEditorState( createEditorState() )
	}

	return {
		editRef,
		editorState,
		setEditorState,
		resetEditorState,
	}

}