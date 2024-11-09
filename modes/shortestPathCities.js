import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { input } from "../pieces/input.js"
import { drawerHandle } from "../pieces/drawer-handle.js"

import { mapSvgElement, pathes,  clear, fill } from "../map.js"
import { pathTitles } from "../path-titles.js"

import { neighbours, shortest } from "../data/neighbours.js"

const activeCity = "Abşeron"
let from = "Abşeron"
let to = "Ağdaş"

let neighs = []

const inputArg  = {
	list: pathTitles,
	citySelect(city) {
		clear("#eee")
		const adjecents = shortest(from, city)
		if (adjecents) adjecents.map(a=>fill(a, 'red'))
	}
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
					<ul>
						${neighs.map(c => v`<li>${c}</li>`)}
					</ul>
			</div>
		`
	}
}
