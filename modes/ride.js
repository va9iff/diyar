import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import {setPage} from "../pages.js"
import { mapSvgElement, pathes,  clear, fill } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { neighbours, shortest, randomCity } from "../data/neighbours.js"

function repaint() {
	clear()
	for (const coin of m.coins) 
		fill(coin.city, coin.collected ? "#7ff" : "#ff7")
	fill(m.at, "#7f7")
}

const m = {}
export const ride = {
	reset() {
		m.at = randomCity()
		m.coins = []
		m.coins.push({collected: false, city: randomCity(m.at)})
		m.coins.push({collected: false, city: randomCity(m.at, m.coins[0])})
		m.coins.push({collected: false, city: randomCity(m.at, m.coins[0], m.coins[1])})
	},
	content() {
		repaint()
		return v`

				<div class="sticky-top">
					<div class="drawer-padding"></div>
					${drawerHandle()}
				</div>
				<div class="mpadded">
					<button class="pc chip" ${{ onn, click: e => setPage("startPage")}}>geri</button>
					<button class="chip" ${{ onn, click: ride.reset}}>Yenidən başla</button>
				</div>
				<div class="mpadded">
					<h1>at ${m.at}</h1>
					<div class="row middle wrap">
						${neighbours[m.at].map(city=>v`<button class="neighbourCard"
							${{ onn, click: e => {
								m.at = city
								const coin = m.coins.find(c => c.city == city)
								if (coin) coin.collected = true
								if (m.coins.every(coin => coin.collected)) alert("win")
							}}}>${city}
						</button>`)}
					</div>
				</div>
		`
	}
}
