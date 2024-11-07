import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn } from "../v.js"
import { input } from "../pieces/input.js"
import { drawerHandle } from "../pieces/drawer-handle.js"

import { mapSvgElement, pathes,  clear } from "../map.js"
import { pathTitles } from "../path-titles.js"
const data =  { 
	
}

const grab = s => document.querySelector(s)

const citySelect = () => activate() // it also checks
const inputArg = { citySelect, list: pathTitles, activeChip: 0, activeCity: "",
	inputClick: e => grab(".contentside")?.scrollTop < 300 ?
		grab(".contentside")?.scrollTo({ top: 300 }) : null }

const contentsideRefGet = () => document.querySelector(".contentside")

function activate(i = null) {
	// if (state.activeChip == -1) return 0
	if (i != null) inputArg.activeChip = i
	inputArg.activeCity = inputArg.showingTitles[inputArg.activeChip]
	const path = pathes[inputArg.activeCity]
	path.setAttribute("fill", "#f00")
}

export const mode = {
	citySelect() {

	},
	content() {
		return v`

				<div class="sticky-top">
					<div class="drawer-padding"></div>
					${drawerHandle()}
					${input(inputArg)}
				</div>
				<div class="mpadded">
					<h1 ${{ style, color: "#262626"}}>${inputArg.activeCity}</h1>
					<img 
						${{ cls, splashart: 1 }} 
						${{ attr, src: inputArg.activeCity ? `./imgs/${inputArg.activeCity.toLocaleLowerCase()}.jpg` : none}}>
				</div>
		`
	}
}
