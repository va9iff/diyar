import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import {setPage} from "../pages.js"
import { mapSvgElement, pathes,  clear, fill, fillClass, moveCar, setCoins } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { neighbours, shortest, randomCity } from "../data/neighbours.js"
import { pop } from "../pieces/modal/modal.js"

const currColor = "#7f7"

function repaint() {
	clear()
	fill(m.at, currColor)
	moveCar(m.at)
}

// function win() {
// 	m.step = "won"
// 	repaint()
// 	update()
// }

const m = {
	step: "init",
}

function drawerContent() {
		return v`		
		<div class="mpadded">
			<div class="row" style="gap: 14px; margin-bottom: 14px">
				<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
				<button class="bbtn" ${{ onn, click: e =>{
					detector.reset()
					moveCar(m.at)
				}}}>↻</button>
			</div>
			<h1 style="color: #252525">📍${m.at}</h1>
			<div class="row progress">${shortest(m.at, m.to).length - 1}</div>
			<div class="row middle wrap">
				${neighbours[m.at].map(city=>v`<button class="bbtn"
					style=" padding: 15px 20px; font-size: 16px; border-radius: 30px; margin: 7px; "
					${{ onn, click: e => {
						if (city == m.to) m.step = "win"
						m.at = city
					}}}>${city}
				</button>`)}
			</div>
		</div>
	`
}
export const detector = {
	// if exists, only firest this in the start and does not fire reset
	// init() {
	// 	clear()
	// 	moveCar(null)
	// },
	die() {
		moveCar(null)
	},
	reset() {
		m.step = "game"
		m.at = randomCity()
		m.to = randomCity([m.at])
	},
	content() {
		repaint()
		switch (m.step) {
			case "game": 
			return v`
					<div class="sticky-top">
						${drawerHandle()}
					</div>
					<div class="mpadded">
						${drawerContent()}
					</div>
			`
			case "win": 
				return v`
					<div class="mpadded">
						<div class="centered middle">Təbriklər! 
						Siz xəzinənin harada olduğunu tapdınız.</div>
						<button class="bbtn" ${{ onn, click: e => detector.reset()}}>yenidən oyna</button>
						<button class="bbtn" ${{onn, click: e => setPage("startPage")}}>geri</button>
					</div>
				`
		}
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
