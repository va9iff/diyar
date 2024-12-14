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
}

// function win() {
// 	m.step = "won"
// 	repaint()
// 	update()
// }

const m = {
	step: "init",
}

let showButtons = true

function drawerContent() {
		const steps = shortest(m.at, m.to).length - 1
		const progress = steps == 0 ? 100 : 100 / (steps+1) + 50
		return v`		
		<div class="mpadded">
			<div class="row" style="gap: 14px; margin-bottom: 14px">
				<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
				<button class="bbtn" ${{ onn, click: e =>{
					detector.reset()
					// moveCar(m.at)
				}}}>↻</button>
			</div>
			<h1 style="color: #252525">📍${m.at}</h1>
			<div class="row centered progressfield" ${{ cls, oneleft: steps == 1}}>
				<div class="row progress grow">
					<div class="progressbar" ${{ style, width: progress + "%"}}></div>
				</div>
				<span style="font-size: 24px; margin: 0 10px ">
					${steps}
				</span>
			</div>
			<br>
			<div class="row middle wrap">
				${!showButtons ? "" : neighbours[m.at].map(city=>v`<button class="bbtn popping"
					style="animation-duration: 400ms; padding: 15px 20px; font-size: 16px; border-radius: 30px; margin: 7px; "
					${{ onn, click: e => {
						if (city == m.to) m.step = "win"
						showButtons = false
						setTimeout(()=>{
							showButtons = true
							update()
						}, 400)
						m.at = city
						moveCar(m.at)
					}}}>${city}
				</button>`)}
			</div>
		</div>
	`
}
export const detector = {
	fixed: true,
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
		moveCar(m.at)
	},
	content() {
		repaint()
		switch (m.step) {
			case "game": 
			return v`
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
