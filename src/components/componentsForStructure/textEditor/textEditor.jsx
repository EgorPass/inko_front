import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const TextEditor = ({ editRef, editorState, setEditorState, options,
	wrapperClassName = "",
	editorClassName = "",
	toolbarClassName = "	"
}) => {



	return (
			<Editor
				ref = { editRef }
				toolbar={{
					options: options,							
					inline: { inDropdown: true },
					list: { inDropdown: true },
					textAlign: { inDropdown: true },
					link: { inDropdown: true },
				}}
				
				wrapperClassName = { wrapperClassName }				
				editorClassName = { editorClassName }
				toolbarClassName = { toolbarClassName }

				editorState={editorState}
				onEditorStateChange={setEditorState}

			/>
	)
}

export default TextEditor