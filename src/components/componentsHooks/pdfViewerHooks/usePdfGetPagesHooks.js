import { useRef } from "react"

export const usePdfGetPagesHooks = ({
	doc,
	peaceData, 	containerRef,	htmlCollection,
	loadReady, setLoadReady,
	isNumber = () => { },
	setPageNumber = () => { }
}) => {
	
	const pagesForRender = useRef( new Set( ) )
	const pagesForRemove = useRef( new Set ( ))
	const statePageRender = useRef( false )
	const statePageRemove = useRef( false )
	
	//////// используется в createPageData
	const getPageInfo = async ({ doc, scale, idx }) => {
		const page = await doc.getPage(idx)
		const viewport = await page.getViewport({ scale } )

		return {
			page,
			viewport,
		}
	}

	//////// испльзуется в createPageData
	const createCanvas = ({width, height},  id = "") => {
		const canvas = document.createElement("canvas")
					canvas.width = width
					canvas.height = height
					canvas.style.backgroundColor = "white"
					canvas.style.display = "block"
					canvas.style.width = "100%"
					canvas.style.margin = "0 auto"
					canvas.setAttribute("id", id)
					canvas.setAttribute("name", id )
					canvas.className = "pdfViewer__pageCanvas"
		const context = canvas.getContext("2d")
		
		return {
			canvas,
			context,
		}
	}
	
	//////////////////////////////////
	const createPageData = async ({ idx = 1, scale = 1, canvasId = "", } ) => {
		let nodeData = { pageNumber: idx,	render: false, loaded: false, remove: false }
		
		const data = 	await getPageInfo( { doc, scale, idx })
		const { page, viewport } = data
		if (page.destroyed) {
			page.destroyed = false
			page.cleanup( true )
		}
		const { canvas, context } = createCanvas(viewport, canvasId)
		
		return { ...nodeData, ...{ canvas, context, page, viewport } }							
	}

	/////////// используется в loadPagesFromLoadThread
	const pageRender = ({ page, context, viewport }) => {
		return new Promise( async (res, rej) => {
			
			setTimeout( async () => {
				try {
					
					await page.render({
						canvasContext: context,
						viewport,
					})
					
					res( page )
				}
				catch (e) {
					rej( e.message )
				}
			}, 100)
		})
	}

	/////////// используется в removePagesAtScrolling
	const pageRemove = ({ page, data }) => {
		return new Promise( async(res, rej) => {
				try {
					
					const anch = htmlCollection.current[data.pageNumber - 1].getElementsByTagName("a")[0]
					const canvas = anch.getElementsByTagName("canvas")[0]
					
					const canvasId = canvas.id
					const scale = canvasId.startsWith("thumbs") ? .3 : 2
					const idx = data.pageNumber
					
					await data.page._destroy();

					const newData = await createPageData({ idx, scale, canvasId })
					
					peaceData.current[idx - 1] = newData
					
					canvas.remove()
					anch.prepend(newData.canvas)
					
					pagesForRemove.current.delete(data)

					res( true )
				}
				catch (e) {
					rej( e.message )
				}
		})
	}

	////////////// исполльзуется в addPagesForLoadThread
	const getCoordsLines = ( node, coordsContainer ) => {
		const coordsNode = node.getBoundingClientRect();
		
		const containerHeight = coordsContainer.height
		const top = coordsNode.top - coordsContainer.top - containerHeight
		const bottom = coordsNode.bottom - coordsContainer.top + containerHeight

		return {
			topLineView : (	 top >= 0 &&  top <= containerHeight ),
			bottomLineView : ( bottom > 0 && bottom < containerHeight ),
			centerPageView : (  top < 0 && bottom > containerHeight ),
		}
	}

	///////////// используется в viewPages //////////////////////////
	const getPagesAtContainer = (target, length) => {
		const scrollHeight = containerRef.current.parentNode.scrollHeight
		const scrollTop_ = containerRef.current.parentNode.scrollTop
		const pageHeight = ( scrollHeight / length )
		const patPage = Math.round( scrollTop_ / pageHeight ) 
		const colPages = Math.round( target.clientHeight / pageHeight )
	
		return {
			patPage,
			colPages,
		}
	}

	///////////// используется в viewPages //////////////////////////
	const addPagesForLoadThread = ({
		start, step, stop,	nodes, coordsContainer,
	}) => {
		while (start < step ) {
			const k = start++
				setTimeout(() => {
						
					const { topLineView, bottomLineView, centerPageView } = getCoordsLines( nodes[k],  coordsContainer )
					
					if ( topLineView || centerPageView || bottomLineView  ) { 
						
						const data = peaceData.current[k]		
						
						if (!data.render) {
							peaceData.current[ k ].render = true
							data.canvas.classList.add( "pdfViewer__pageCanvas_loading" )				
							pagesForRender.current.add( data )			
						}	
					}
					
				}, 200)
			if ( start === stop  ) break;
		}
	}

	///////////// используется в viewPages //////////////////////////
	const loadPagesFromLoadThread = async () => {
		
		if (!statePageRender.current) {
			statePageRender.current = true
			
			for (let data of pagesForRender.current) {
				
				if (!data.loaded ) {
					
					data.loaded = true
					await pageRender(data)
					// data.page.cleanup(true)
										
					setTimeout(() => {
						data.canvas.classList.remove("pdfViewer__pageCanvas_loading")			
					}, 200)

					pagesForRemove.current.add( data )
					pagesForRender.current.delete( data )
				}
			}

			statePageRender.current = false
		}
	}

	const removePageFromThread = ( target, length, data, callback) => {
		setTimeout( async () => {
			const { patPage, colPages } = getPagesAtContainer(target, length) 
			const topLine = patPage - 1;
			const bottomLine = patPage + colPages + 2

				if ( ( data.pageNumber < topLine ) || ( data.pageNumber > bottomLine ) ) { 
					callback( )
				}		
			}	, 200 )
	}

	const removePagesAtScrolling = async ( target, length ) => { 

		for (let data of pagesForRender.current) {
			removePageFromThread( target, length, data, () => {
				 	if (data.render && !data.loaded) {
						data.render = false 
						data.canvas.classList.remove("pdfViewer__pageCanvas_loading")			
						pagesForRender.current.delete( data )
					}
			})
		}
		
		if (!statePageRemove.current ) {
			statePageRemove.current = true
		
			for (let data of pagesForRemove.current) {
				removePageFromThread( target, length, data, async () => {
				 		if (data.loaded && data.render && data.pageNumber !==1 && !data.remove ){ 
							data.remove = true 
							await pageRemove({ page: data.page, data })
						}
				})
			}
			statePageRemove.current = false 
		}
	}

	////////////// используется в скролинге и первом выводе //////////////
	const viewPages = async ( target, nodes ) => {
		
		const coordsContainer = target.getBoundingClientRect() 
		
		const length = nodes.length
		if( !length ) return;
		
			const  { patPage, colPages } = getPagesAtContainer(target, length) 
	
			const start = !isNumber(patPage) ? 0 : ((patPage - 2) < 0) ? 0 : patPage - 2;
			const step = patPage + colPages + 2
			
		addPagesForLoadThread({
			start, step, stop: length, 
			coordsContainer, nodes,
		})
	
		setTimeout(async () => {	
			await loadPagesFromLoadThread()
		}, 300)

		setPageNumber(patPage + 1)		
	}

	///////////// разрешите представить собственно сам скролинг ///////////
	const handleScrollContainer = async ( e ) => {
		const target = e.target;
			if( !target ) return;
			
			await	removePagesAtScrolling( target, htmlCollection.current.length )
			
			await viewPages(target, htmlCollection.current)
	}
	
	////////// используется в самом компоненте /////////////////////////////
	const buildPagesData = async({
		numPages = 0,
		scale = 1,
		className = "",
	}) => {

		const pages = [ ];
			
		for (let i = 0; i < numPages; i++) {
			setTimeout(async () => {
				const idx = i + 1
					
				const data = await createPageData( { idx, canvasId: `${ className }-${ idx }`, scale } )
					pages.push( data )
				
				if (pages.length === numPages) {
					peaceData.current = pages
					setLoadReady(prev => ({ ...prev, loaded: true }))						
				}	

			}, 600 )
		}
	}

	////////// используются в самом компоненте /////////////////////////////
	const createPageNode = ({ pageNumber, canvas }) => {
		const anch = document.createElement("a")
					anch.name = `canvas-pageAnchor-${ pageNumber }`
					anch.id = `canvas-pageAnchor-${ pageNumber }`
		
					anch.className = "pdfViewer__pageAnchor"
					anch.append( canvas )
		
		const li = document.createElement("li")
					li.className = "pdfViewer__pagesListItem"
					li.append( anch )
		
		return li
	}

	////////// используются в самом компоненте /////////////////////////////
	const createThumbNode = ({ pageNumber, canvas }) => {
		const span = document.createElement("span")
					span.className = "pdfViewer__thumbsListItemTitle"
					span.innerHTML = `стр. ${pageNumber}`
		
		const anch = document.createElement("a")
					// anch.name = `canvas-pageAnchor-${ pageNumber }`
					anch.id = `canvas-thumbAnchor-${ pageNumber }`
					anch.className = "pdfViewer__thumbAnchor"
					anch.href = `#canvas-pageAnchor-${ pageNumber }`
					anch.append( canvas, span )
		
		const li = document.createElement("li")
					li.className = "pdfViewer__thumbsListItem"
					li.append( anch )
		
		return li
	}

	////////// используются в самом компоненте /////////////////////////////
	const createHtmlCollectionAtContainer = (nodeCreator, className) => {
		if ( loadReady.loaded && !loadReady.ready ) {
			if (containerRef.current ) {
	
				containerRef
					.current.append(...peaceData.current.map((it, i) => nodeCreator(it)))
				htmlCollection
					.current = containerRef.current.getElementsByClassName( className )
			
				setLoadReady(prev => ({ ...prev, ready: true }))
				viewPages(  containerRef.current.parentNode, htmlCollection.current  )
			}
		}
	}

	return {
		createPageNode,		createThumbNode,
		buildPagesData,		handleScrollContainer, 			createHtmlCollectionAtContainer,
	}
} 