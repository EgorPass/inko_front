export const initialUser =  {
	email: "",
	surName: "",
	name: "",
	secondName: "",
	id: 0,
}

export const initialRoles = [
	[ "create_user", false ],
	[ "create_content", false ],
	// [ "change_user", false ],
		// [ "can_upload", false ],
		[ "can_download", false ],
		["can_use", true]
]

export const initialCourse = {
	id: null,
	subjectId: null,
	title: "",
	type: "file",
	isexist: false,
}
	

export const initialSubject = {
	id: null,
	title: '',
}

export const translator = {
	"create_user": "создавать пользователя",
	"create_content": "создавать контент",
	// "change_user": "изменять пользователя",
	// "can_upload": "загружать контент",
	can_download: "скачивать контент",
	can_use: "пользоваться контентом",
	
	email: "Логин",
	name: "Имя",
	surName: "Фамилия",
	secondName: "Отчество",

	1111111: "создавать пользователя",
	// 1011111: "изменять пользователя",
	1001111: "создавать контент",
	// 1000111: "загружать контент",
	1000011: "скачивать контент",
	1000001: "пользоваться контентом",
}

export const rolesId = {
		"create_user": 		1111111,
		// "change_user": 		1011111,
		"create_content": 1001111,
		// "can_upload": 		1000111,
		"can_download": 	1000011,
		"can_use": 				1000001,

	1111111: "users",
		1001111: "courses",
}

// export const initialDataForEditor = `<div aria-label="rdw-editor" class="notranslate public-DraftEditor-content" contenteditable="true" role="textbox" spellcheck="false" style="outline: none; user-select: text; white-space: pre-wrap; overflow-wrap: break-word;"><div data-contents="true"><div class="" data-block="true" data-editor="3gbn2" data-offset-key="doed0-0-0"><div data-offset-key="doed0-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="doed0-0-0"><span data-text="true">Давайте добавим описание</span></span></div></div></div></div>`

export const initialDataForEditor = `Давайте добавим описание`
// export const initialDataFor
export const optionsForEditorDesc = [
		'fontFamily',
		'fontSize',
		'inline',
		'colorPicker',
		'blockType',
		'textAlign',
		'list',
		// 'link',
		// 'emoji',
		// 'image',
		// 'history',
		// 'remove',
	]