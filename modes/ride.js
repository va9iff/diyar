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
	console.log('drawed')
	switch (m.step) {
		case "init":
		return v`
		<div>
			<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button> <br><br>
			Siz bu modda düşdüyünüz şəhərdən irəliləyərək qızılı rəngli şəhərlərə sərbəst şəkildə çatmalı və oradakı xəzinələri toplamalısınız. Bütün xəzinələri topladığınızda oyunun qalibi olacqaqsınız. <br><br>
			<button class="bbtn" style="font-size: 16px" ${{ onn, click: e => {
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
			<div class="centered middle row" style="margin-bottom: 20px; gap: 7px">
				${m.coins.map(coin => v`
					<img src="./assets/img/coin-no-dollar.png" class="indicator-coin collected won"
				>`)}
			</div>
			Təbriklər! siz ${m.coins.slice(0, -1).map(({city}) => v`<b>${city}, </b>`)} və ${v`<b>${m.coins.at(-1).city}</b>`} şəhərlərindəki bütün xəzinələri toplayaraq qalib oldunuz.
			<button class="bbtn" ${{ onn, click: e => {
				m.state = "game"
				ride.reset()
			}}}>oyuna yenidən başla</button>
			<button class="pc bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
		</div>
	`
		case "game" :
		repaint()
		return v`		
		<div class="mpadded">
			<div class="row" style="gap: 14px; margin-bottom: 14px">
				<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
				<button class="bbtn" ${{ onn, click: e =>{
					ride.reset()
					moveCar(m.at)
					// setTimeout(()=>{
					// 	moveCar(null)
					// 	setTimeout(()=>moveCar(m.at), 60)
					// }, 60)
				}}}>Yenidən başla</button>
			</div>
			<h1 style="color: #252525">📍${m.at}</h1>
			<div class="centered row middle wrap" style="margin-bottom: 10px">

			${m.coins.map(coin => v`
					<img src="./assets/img/coin-no-dollar.png" 
						class="indicator-coin" ${{ cls, collected: coin.collected }}>
			`)}
				</div>
			<div class="row middle wrap">
				${neighbours[m.at].map(city=>v`<button class="bbtn"
					style=" padding: 15px 20px; font-size: 16px; border-radius: 30px; margin: 7px; "
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
		// setTimeout(()=>{
		// 	m.step = "won"
		// 	update()
		// }, 1000)
		clear()
		moveCar(null)
		// immerseContent() // later
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
const img_name = "Green_JEEP_CLEAN_All"
const img_dir = "./assets/car"
const img_ext = "png"
setTimeout(() => {
	for (let i = 0; i <= 48; i++) {
		let img = new Image();
		img.src = img_dir + "/" + img_name + "_" + (i + "").padStart(3, "0") + "." + img_ext
	}
}, 200)
