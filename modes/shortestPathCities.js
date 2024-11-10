import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { input } from "../pieces/input.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import { setPage } from "../pages.js"
import { mapSvgElement, pathes,  clear, fill } from "../map.js"
import { pathTitles } from "../path-titles.js"

import { neighbours, shortest, randomCity } from "../data/neighbours.js"

const m = {
	from: "Abşeron",
	to: "Qazax",
	activeCity: "Abşeron",
	tried: 0,
	ideal: 1,
	selecteds: [],
	shortestRoad: [],
	wents : ["Abşeron"]
}

function checkWents() {
	for (const selected of m.selecteds.filter(s => !m.wents.includes(s))) {
		if (m.wents.some(went => neighbours[went].includes(selected))) {
			m.wents.push(selected)
			checkWents()
		}
	}
}
function win() {
	alert("Win!")
}

const inputArg  = {
	list: pathTitles,
	citySelect(city) {
		if (m.selecteds.includes(city)) return null
		clear("#eee")
		m.activeCity = city
		m.shortestRoad = shortest(m.activeCity, m.to)
		m.selecteds.push(city)
		for (const s of m.selecteds) fill(s, "#ff7")
		checkWents()
		fill(m.activeCity, "#f33")
		for (const w of m.wents) fill(w, "#7ff")
		fill(m.from, "#7f7")
		fill(m.to, "#77f")
		m.tried++
		if (m.wents.some(went => neighbours[went].includes(m.to))) win()
	}
}

export const shortestPathCities = {
	reset() {
		const cachedRandomCity = randomCity()
		Object.assign(m, {
			from: cachedRandomCity,
			to: randomCity(cachedRandomCity, neighbours[cachedRandomCity]),
			selecteds: [],
		})
		m.shortestRoad=shortest(m.from, m.to)
		m.activeCity = m.from
		m.wents = [m.from]
		m.tried = 0
		m.ideal = m.shortestRoad.length - 1
		inputArg.list = pathTitles.filter(t => ![m.from, m.to].includes(t))
		inputArg.activeChip = -2

		clear("#eee")
		fill(m.from, "#7f7")
		fill(m.to, "#77f")
		// fill(m.activeCity, "#f33")

	},
	content() {
		// inputArg.list = pathTitles.filter(t => ![m.from, m.to, ...m.selecteds].includes(t))
		inputArg.dimmed = m.selecteds
		return v`
			<div class="mpadded">
				<button class="pc chip" ${{ onn, click: e => setPage("startPage")}}>geriyə</button>
				<button class="chip" ${{ onn, click: e => shortestPathCities.reset()}}>yenidən başlat</button>
			</div>
			<div class="sticky-top">
				${drawerHandle()}
				${input(inputArg)}
			</div>
			<div class="mpadded">
				<h1 ${{ style, color: "#262626"}}>${m.activeCity}</h1>
				<b>${m.from}</b> şəhərindən <b>${m.to}</b> şəhərinə çatmaq üçün şəhərləri daxil edin <br>
				gedildi: <b>${m.tried}</b>; ideal <b>${m.ideal}</b>
			</div>
		`
	}
}
				// <button ${{ onn, click: e => setPage("startPage")}}>back</button>
	//
				// <img 
				// 	${{ cls, splashart: 1 }} 
				// 	${{ attr, src: m.activeCity ? `./imgs/${m.activeCity.toLocaleLowerCase()}.jpg` : none}}>
