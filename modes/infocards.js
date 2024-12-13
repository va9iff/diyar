
import { v, state, onn, on, cls, style, attr, none, update } from "../v.js"
import { input } from "../pieces/input.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import { setPage } from "../pages.js"
import { mapSvgElement, pathes,  clear, clearClass, fill, fillClass } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { pop } from "../pieces/modal/modal.js"
import { facts } from "../data/facts.js"

import { ipucus } from "../assets/ipucus.js"

import { neighbours, shortest, randomCity } from "../data/neighbours.js"

const m = {}

function win() {
	m.won = true
	pop(close => v`
		<div>
			Qalib gəldiniz! Oynamağa dəvam etmək istəyirsiniz?
			<button class="bbtn" ${{ onn, click: e => { 
				infocards.reset()
				m.won = false
				close()
			}}}>yenidən başla</button>
			<button class="bbtn" ${{ onn, click: close}}>bağla</button>
		</div>
	`)
	update()
}

const randIntTill = to => Math.floor(Math.random() * to)

const shuffle = arr => arr
	.map(value => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value)

function getGameCards() {
	m.misclicks = []
	if (m.currentStep >= m.shortestRoad.length) throw new Error("Qaqa hara belə? axırıncı şəhərin kartları lazımdı?")
	let neighs = shuffle(neighbours[m.shortestRoad[m.currentStep]])
	console.log(neighs)
	if (neighs.length > 3) neighs = neighs.filter(neigh => !m.shortestRoad.slice(0, m.currentStep).includes(neigh))
	console.log(neighs)
	const arr = []
	arr.push(m.shortestRoad[m.currentStep])
	if (neighs.length) arr.push(neighs.pop())
	if (neighs.length) arr.push(neighs.pop())
	return shuffle(arr)
}

function setCurrentStep(currentStep) {
	m.currentStep = currentStep
	m.cards = getGameCards()
	m.shownTips = {}
	for (const city of m.cards) 
		m.shownTips[city] = facts[city][Math.floor(facts[city].length * Math.random())]
}

let interval = null
function repeat(fun) {
	if (interval) clearInterval(interval)
	if (fun) interval = setInterval(fun, 15)
}

let focusedCard = 0

export const infocards = {
	reset() {
		m.won = false
		m.from = randomCity()
		m.to = randomCity([m.from, ...neighbours[m.from]])
		m.shortestRoad=shortest(m.from, m.to)
		// m.currentStep = 0
		setCurrentStep(0)
		m.wents = []
		m.misclicks = []
		m.lives = 3
		// m.cards = getGameCards()
		clear("#eee")
		clearClass()
		// fill(m.current, "#f33")

	},
	content() {
		clear()
		clearClass()
		for (const city of m.shortestRoad) 
			fill(city, "#aca")
		for (let i = 0; i < m.currentStep && i < m.shortestRoad.length; i++) 
			fill(m.shortestRoad[i], "#7f7")	
		fill(m.from, "#7f7")
		// fill(m.to, "#ff7")
		fill(m.shortestRoad[m.currentStep], "#77f")
		fillClass(m.shortestRoad[m.currentStep], "current-blinking")
		return v`
			<div class="sticky-top" style="background-color: var(--content-bg); z-index: 10">
				<div class="centered row wrap" style="padding-left: 20px; gap: 5px;" >
					${drawerHandle()}
					<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
					<button class="bbtn" ${{ onn, click: e => infocards.reset()}}>↻</button>
					<div class="row middle" style="margin-left: auto; gap: 5px; margin-right: 20px; text-align: center; font-size: 30px; padding: 4px">${new Array(m.lives).fill(v`<span>❤️</span>`)}<br></div>
				</div>
			</div>
			<div class="mpadded" ${{on, touchstart: e=>repeat(null)}}>
				${m.won ? v` <div>Siz uğurlu bir şəkildə ${m.from} şəhərindən ${m.to} şəhərinə mədəni məlumatlarla 
					çata bildiniz! <button class="bbtn" ${{ onn, click: e => { infocards.reset() }}}>
						yenidən başlaya</button> və ya <button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>
						&lt; geri qayıda</button> bilərsiniz.
					</div>` :
						v`
					<div class="row box scroll-x cards-scroller" style="position: relative"> 
						<div class="leftScroller" ${{on, mouseover: e => {
							repeat(()=> e.target.parentElement.scrollLeft -= 5)
							// e.target.parentElement.scrollLeft -= 2
						}, mouseleave: e => repeat(null), 
							// mousemove: e => e.target.parentElement.scrollLeft -= 3, // speeder
							// click: e => e.target.parentElement.scrollLeft -= 1300
						}}></div>
						${m.cards.map((city, i) => v`
						<button class="game-card" ${{ cls, disabled: m.misclicks.includes(city), [`game-c${i}`]: true}} ${{ onn, click: e => {
						if (m.misclicks.includes(city)) return null
						if (city == m.shortestRoad[m.currentStep]) {
							if (m.currentStep == m.shortestRoad.length - 1) return m.won = pop(close => v`
								<h1>Qalib oldunuz! </h1>
								<button class="bbtn" ${{onn, click: e => { infocards.reset(); close(); }}}>yenidən başlat</button>
								`) || true
							setCurrentStep(m.currentStep+1)
							m.cards = getGameCards()
						} else {
							m.lives--
							if (m.lives <= 0) return pop(close => v`<div>
								Təəssüflər olsun ki səhvləriniz bütün canınızı apardı. <br><br> <button class="bbtn" ${{
									onn, click: e => { infocards.reset(); close() }
								}}>yenidən başla</button> 
								</div>`)
							m.misclicks.push(city)
						}
					}}}>${m.shownTips[city]}</button>`)}
						<div class="rightScroller" ${{on, mouseover: e => {
							repeat(()=> e.target.parentElement.scrollLeft += 5)
							// e.target.parentElement.scrollLeft -= 2
						}, mouseleave: e => repeat(null), 
							// mousemove: e => e.target.parentElement.scrollLeft += 3, // speeder
							// click: e => e.target.parentElement.scrollLeft += 1300
						}}></div>

					</div>`}
				<div style="opacity: 0.7; text-align: center; padding-top: 30px">Şəkildə yanıb sönən şəhər üçün uyğun gələn kartı seçərək yolunuza dəvam etməlisiniz</div>
			</div>
		`
	}
}

console.log(Object.keys(facts))
