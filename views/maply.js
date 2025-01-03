import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn, update } from "../v.js"

import { mapSvgElement, popups, pathes,  clear } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { setPage } from "../pages.js"
import { pop } from "../pieces/modal/modal.js"
// state.mode = null

// import { mode}

// import { mode } from "../modes/explore.js"
// import { mode } from "../modes/shortestPathCities.js"

// export async function setMode(modeId) {
// 	const { mode } = import(`./${modeId}`)
// 	state.mode = state.mode
// }

// state.mode = mode
// import("../modes/explore.js").then(({ mode }) => {
// 	state.mode = mode
// 	update()
// })

// import { input } from "../pieces/input.js"

// state.input = ""
// state.showingTitles = pathTitles
// state.activeChip = 1 // = -1 when no match and no showingTitles
// state.activeCity = "" // = -1 when no match and no showingTitles

state.handleTouchStartY = 0
state.handleTouchEndY = 0

function immerseContent() {
	document.body.classList.add("immerse-content")
	document.body.classList.remove("immerse-map")
}
function immerseMap() {
	// if (state.mode?.fixed) return
	document.body.classList.add("immerse-map")
	document.body.classList.remove("immerse-content")
}

immerseMap()

let initialDistance = null
let currentDistance = null

let initialMedian = []
function getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

export const maply = () => {
	if (state.mode?.fixed) setTimeout(()=>immerseMap(), 300)
	return !state.mode ? v`<h1>loading</h1>` : v`
	<div class="view toprow row flips" ${{ cls, mapScale: state.mapScale }}>
		<div class="pinneds">
			<button style="position: fixed" class="pc" ${{ on, click: e => pop(() => v`
				<div class="col box">
					<img src="./qr-code.png" class="qr-img">
				</div>
			`)}}>i</button>	
		</div>
		<div class="mapside row" ${{ on, 
		touchstart: e => {
			if (!state.mode?.fixed) document.querySelector(".contentside")?.scrollTo({ top: 0 })
			if (e.touches.length === 2) {
				initialMedian = [(e.touches[0].clientX + e.touches[1].clientX) / 2, (e.touches[0].clientY + e.touches[1].clientY) / 2]
				initialDistance = getDistance(e.touches[0], e.touches[1]);
			}
			state.mapScale = true
			update()
		},
		touchmove: e => {
			e.preventDefault()
			if (e.touches.length === 2) {
				currentDistance = getDistance(e.touches[0], e.touches[1])
				

				const currentMedian = [(e.touches[0].clientX + e.touches[1].clientX) / 2, (e.touches[0].clientY + e.touches[1].clientY) / 2]
				// e.currentTarget.style.transform = `scale(${currentDistance/initialDistance})`
				mapSvgElement.style.transform =  `
				scale(${currentDistance/initialDistance}) 
				translateX(${(currentMedian[0] - initialMedian[0])*0.5}px) 
				translateY(${(currentMedian[1] - initialMedian[1])*0.3}px)
				`
				mapSvgElement.style.transformOrigin = "center"
				// mapSvgElement.style.position = "absolute"
			}
			
		},
		touchend: e => {
			state.mapScale = false,
			mapSvgElement.style.transform =  `scale(1)`
			update()

		}
		}}>
			<img src="./assets/img/preblurred.jpg" class="azebg">
			<div class="bgfade"></div>
			<div class="svg-container">
				${ state.mode?.outline ? v`<img class="map-popups" src="./assets/maply/outline.png" >` : ""}
				${put(mapSvgElement)}
				${put(popups)}
			</div>
		</div>
		<div class="contentside col grow" 
			${{ on, touchend: e => {
				if (state.mode?.fixed) return 
				let target = e.changedTouches[0].target
				let i = 0
				console.log(target)
				while ((!(target.classList.contains("contentside"))) && i < 30) {
					target = target.parentElement
					i++
					console.log(i, target)
				}
				console.log(target)
				if (target.scrollTop > 5) immerseContent()
				else if (target.scrollTop < 5 ) immerseMap()
			},
			scroll: e => {
				if (state.mode?.fixed) return 
				let target = e.target
				if (target.scrollTop <= 0) {
					immerseMap()
				}
			}}}
		>
			<div ${{
					cls, hidden: state.mode?.fixed
				}}
				class="drawer-glance col middle centered" style="position: sticky; top:0">
					<h1 ${{ onn, click: e => setPage("startPage")}}>&lt;-Diyar</h1>
			</div>
			<div class="drawer col"
			${state.mode?.nopad ? { style, paddingBottom: 0 } : { style }}>
					${state.mode.content()}
				<div class="drawer-padding-bottom" ${{
					cls, hidden: state.mode?.fixed || state.mode?.nopad
				}}></div>
			</div>
		</div>
	</div>
`
}
