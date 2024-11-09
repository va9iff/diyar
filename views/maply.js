import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn, update } from "../v.js"

import { mapSvgElement, pathes,  clear } from "../map.js"
import { pathTitles } from "../path-titles.js"

state.mode = null

// import { mode}

// import { mode } from "../modes/explore.js"
import { mode } from "../modes/shortestPathCities.js"
state.mode = mode
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
	document.body.classList.add("immerse-map")
	document.body.classList.remove("immerse-content")
}

immerseMap()

export const maply = () => v`
	<div class="view toprow row flips">
		<div class="mapside row" ${{ on, touchstart: e => document.querySelector(".contentside")?.scrollTo({ top: 0 })}}>
			<div class="svg-container">
				${put(mapSvgElement)}
			</div>
		</div>
		<div class="contentside col grow" 
			${{ on, scroll: e => e.target.scrollTop > 150 ? immerseContent() : immerseMap() }}
		>
			<div class="drawer-glance col middle centered" style="position: sticky; top:0">
					<h1>Diyar</h1>
			</div>
			<div class="drawer col">
					${state.mode.content()}
					<button class="chip" ${{ onn, click: e => clear()}}>Təmizlə</button>
				<div class="drawer-padding-bottom"></div>
			</div>
		</div>
	</div>
`
