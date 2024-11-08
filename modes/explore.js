import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { input } from "../pieces/input.js"
import { drawerHandle } from "../pieces/drawer-handle.js"

import { mapSvgElement, pathes,  clear } from "../map.js"
import { pathTitles } from "../path-titles.js"

const inputArg = { 
	citySelect, 
	list: pathTitles, 
	focusScroll: true
}

let activeCity = ""

function citySelect(city) {
	activeCity = city
	if (!city) return
	const path = pathes[city]
	path.setAttribute("fill", "#f00")
	update()
}

export const mode = {
	content() {
		return v`

				<div class="sticky-top">
					<div class="drawer-padding"></div>
					${drawerHandle()}
					${input(inputArg)}
				</div>
				<div class="mpadded">
					<h1 ${{ style, color: "#262626"}}>${activeCity}</h1>
					<img 
						${{ cls, splashart: 1 }} 
						${{ attr, src: activeCity ? `./imgs/${activeCity.toLocaleLowerCase()}.jpg` : none}}>
				</div>
		`
	}
}
