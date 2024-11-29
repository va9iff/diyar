import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import {setPage} from "../pages.js"
import { mapSvgElement, pathes,  clear, fill, fillClass, moveCar, setCoins } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { neighbours, shortest, randomCity } from "../data/neighbours.js"
import { pop } from "../pieces/modal/modal.js"

function repaint() {
	clear()
	for (const coin of m.coins) 
		fill(coin.city, coin.collected ? "#7ff" : "#ff7")
	fillClass(m.at, "current-blinking")
	setCoins(m.coins.filter(coin=>!coin.collected).map(coin => coin.city))
	moveCar(m.at)
}

function win() {
	m.step = "won"
	repaint()
	update()
}

const m = {
	step: "init",
}

function drawerContent() {
	switch (m.step) {
		case "init":
		return v`
		<div>
			<button class="pc btn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button> <br><br>
			Siz bu modda düşdüyünüz şəhərdən irəliləyərək qızılı rəngli şəhərlərə sərbəst şəkildə çatmalı və oradakı xəzinələri toplamalısınız. Bütün xəzinələri topladığınızda oyunun qalibi olacqaqsınız. <br><br>
			<button class="btn" style="font-size: 16px" ${{ onn, click: e => {
				m.step = "game"
				ride.reset()
				}}}>Hazırsınızsa 
				başlayaq!
			</button>
		</div>

	`
		case "won":
		return v`
		<div>
			Təbriklər! siz ${m.coins.slice(0, -1).map(({city}) => v`<b>${city}, </b>`)} və ${v`<b>${m.coins.at(-1).city}</b>`} şəhərlərindəki bütün xəzinələri toplayaraq qalib oldunuz.
			<button class="btn" ${{ onn, click: e => {
				m.state = "game"
				ride.reset()
			}}}>oyuna yenidən başla</button>
			<button class="pc btn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
		</div>
	`
		case "game" :
		repaint()
		return v`		
		<div class="mpadded">
			<button class="pc btn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
			<button class="btn" ${{ onn, click: ride.reset}}>Yenidən başla</button>
			<h1>at ${m.at}</h1>
			<div class="row middle wrap">
				${neighbours[m.at].map(city=>v`<button class="neighbourCard"
					${{ onn, click: e => {
						m.at = city
						const coin = m.coins.find(c => c.city == city)
						if (coin) coin.collected = true
						if (m.coins.every(coin => coin.collected)) win()
					}}}>${city}
				</button>`)}
			</div>
		</div>
	`
	}
}
export const ride = {
	// if exists, only firest this in the start and does not fire reset
	init() {
		m.step = "init"
		clear()
		moveCar(null)
	},
	die() {
		setCoins([])
		moveCar(null)
	},
	reset() {
		m.at = randomCity()
		m.step = "game"
		m.coins = []
		m.coins.push({collected: false, city: randomCity([m.at])})
		m.coins.push({collected: false, city: randomCity([m.at, m.coins[0].city])})
		m.coins.push({collected: false, city: randomCity([m.at, m.coins[0].city, m.coins[1].city])})
	},
	content() {
		// repaint()
		return v`
				<div class="sticky-top">
					${drawerHandle()}
				</div>
				<div class="mpadded">
					${drawerContent()}
				</div>
		`
	}
}
