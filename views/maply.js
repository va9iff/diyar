import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn } from "../v.js"

import { mapSvgElement, pathes,  clear } from "../map.js"
import { pathTitles } from "../path-titles.js"

import { input } from "../pieces/input.js"

state.input = ""
state.showingTitles = pathTitles
// state.activeChip = 1 // = -1 when no match and no showingTitles
state.activeCity = "" // = -1 when no match and no showingTitles
state.handleTouchStartY = 0
state.handleTouchEndY = 0


const citySelect = () => activate() // it also checks
const inputArg = { citySelect, list: pathTitles, activeChip: 0, 
	inputClick: e => contentsideRefGet().scrollTop < 300 ?
		contentsideRefGet()?.scrollTo({ top: 300 }) : null }

const contentsideRefGet = () => document.querySelector(".contentside")

function activate(i = null) {
	// if (state.activeChip == -1) return 0
	if (i != null) inputArg.activeChip = i
	state.activeCity = state.showingTitles[inputArg.activeChip]
	const path = pathes[state.activeCity]
	path.setAttribute("fill", "#f00")
}


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
		<div class="mapside row" ${{ on, touchstart: e => contentsideRefGet()?.scrollTo({ top: 0 })}}>
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
				<div class="sticky-top">
					<div class="drawer-padding"></div>
					<div class="drawer-handle-container row middle centered" 
					${{ on, touchstart: e => {
						const clientY = e.touches[0].clientY;
						state.handleTouchStartY = clientY
					}}}
					${{ on, touchmove: e=> { 
						state.handleTouchEndY = e.changedTouches[0].clientY
						if (state.handleTouchEndY - state.handleTouchStartY > 10) {
							contentsideRefGet().scrollTo({ top: 0 })
						}
						console.log(state.handleTouchStartY, ",", state.handleTouchEndY)
					
					}}}>
						<div class="drawer-handle"></div>
					</div>
					${input(inputArg)}
				</div>
				<div class="mpadded">
					<h1 ${{ style, color: "#262626"}}>${state.activeCity}</h1>
					<img 
						${{ cls, splashart: 1 }} 
						${{ attr, src: state.activeCity ? `./imgs/${state.activeCity.toLocaleLowerCase()}.jpg` : none}}>
				</div>

					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<button class="chip" ${{ onn, click: e => clear()}}>Təmizlə</button>
				<div class="drawer-padding-bottom"></div>
			</div>
		</div>
	</div>
`
