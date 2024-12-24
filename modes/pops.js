import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import {setPage} from "../pages.js"
import { mapSvgElement, clearClass, pathes,  clear, fill, fillClass, moveCar, setCoins } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { neighbours, shortest, randomCity, shuffle } from "../data/neighbours.js"
import { pop } from "../pieces/modal/modal.js"


function repaint() {
	clear()
	for (const title of pathTitles)
		fillClass(title, "shrink-city")
	if (m.joker == "using")
		for (const neigh of neighbours[m.at])
			fillClass(neigh, "unshrink-city")
	for (const missed of m.misses) {
		fillClass(missed, "unshrink-city")
		fill(missed, "#f33")
	}
	// clearClass(m.at)
	fillClass(m.at, "unshrink-city")
	fill(m.at, "#ff7")
}

function getShwons() {
	if (m.joker == "using") m.joker = "used"
	m.misses = []
	m.showns = []
	m.showns.push(m.at)
	m.showns.push(randomCity([...m.showns]))
	m.showns.push(randomCity([...m.showns]))
	m.showns.push(randomCity([...m.showns]))
	m.showns.push(randomCity([...m.showns]))
	m.showns = shuffle(m.showns)
}

const m = {
	at: randomCity(),
	misses : [],
	showns: []
}

			// <button ${{ onn, click: () => {
			// 	m.at = randomCity()
			// 	getShwons()
			// }}}>randomize</button>

function drawerContent() {
		return v`		
		<div class="mpadded">
			<div class="row" style="gap: 14px; margin-bottom: 14px">
				<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
				<button class="bbtn" ${{ style, opacity: m.joker == "using" ? 0.5 : 1}} ${{ onn, click: ()=> m.joker = "using"}}>
					joker
				</button>
			</div>
		<div class="mpadded">
			<div class="row wrap justify-around align-around" style="gap: 8px">
				${m.showns.map(shown => v`
				<button ${{
						style, opacity: m.misses.includes(shown) ? 0.5 : 1
					}} class="bbtn" ${{ onn, click: () => {
						if (m.misses.includes(shown)) return
						if (shown == m.at) {
							m.at = randomCity()
							getShwons()
						}else {
							m.misses.push(shown)
						}
					}}}>${shown}</button>
				`)}
			</div>
			<div class="row box">
			</div>
		</div>
	`
}
export const pops = {
	fixed: true,
	// die() {
		// moveCar(null)
	// },
	reset() {
		m.at = randomCity()
		m.misses = []
		getShwons()
	},
	content() {
		repaint()
		return drawerContent()
	}
}


