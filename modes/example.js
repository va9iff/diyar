import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import {setPage} from "../pages.js"
import { mapSvgElement, pathes,  clear, fill, fillClass, moveCar, setCoins } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { neighbours, shortest, randomCity } from "../data/neighbours.js"
import { pop } from "../pieces/modal/modal.js"


function repaint() {
	clear()
}

const m = {
}


function drawerContent() {
		return v`		
		<div class="mpadded">
			...
		</div>
	`
}
export const example = {
	fixed: true,
	// die() {
		// moveCar(null)
	// },
	reset() {
	},
	content() {
		repaint()
		return drawerContent()
	}
}


