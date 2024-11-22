
import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { input } from "../pieces/input.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import { setPage } from "../pages.js"
import { mapSvgElement, pathes,  clear, fill } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { pop } from "../pieces/modal/modal.js"

import { ipucus } from "../assets/ipucus.js"

import { neighbours, shortest, randomCity } from "../data/neighbours.js"

const m = {}

function win() {
	m.won = true
	pop(close => v`
		<div>
			Qalib gəldiniz! Oynamağa dəvam etmək istəyirsiniz?
			<button ${{ onn, click: e => { 
				infocards.reset()
				m.won = false
				close()
			}}}>yenidən başla</button>
			<button ${{ onn, click: close}}>bağla</button>
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
	const neighs = shuffle(neighbours[m.shortestRoad[m.currentStep]])
	const arr = []
	arr.push(m.shortestRoad[m.currentStep])
	if (neighs.length) arr.push(neighs.pop())
	if (neighs.length) arr.push(neighs.pop())
	return shuffle(arr)
}

export const infocards = {
	reset() {
		m.won = false
		m.from = randomCity()
		m.to = randomCity([m.from, ...neighbours[m.from]])
		m.shortestRoad=shortest(m.from, m.to)
		m.currentStep = 1
		m.wents = []
		m.misclicks = []
		m.lives = 30
		m.cards = getGameCards()
		clear("#eee")
		// fill(m.current, "#f33")

	},
	content() {
		clear()
		for (let i = 0; i < m.currentStep && i < m.shortestRoad.length; i++) {
			console.log(m.shortestRoad[i])
			fill(m.shortestRoad[i], "lime")
		}
		fill(m.from, "red")
		fill(m.to, "blue")
		fill(m.shortestRoad[m.currentStep], "green")
		return v`
			<div class="mpadded">
				<button class="pc chip" ${{ onn, click: e => setPage("startPage")}}>geriyə</button>
				<button class="chip" ${{ onn, click: e => infocards.reset()}}>yenidən başlat</button>
			</div>
			<div class="sticky-top">
				${drawerHandle()}
			</div>
			<div class="mpadded">
				loves ${m.lives} <br>
				${m.won ? v` <div>Siz uğurlu bir şəkildə ${m.from} şəhərindən ${m.to} şəhərinə mədəni məlumatlarla 
					çata bildiniz! <button ${{ onn, click: e => { infocards.reset() }}}>
						yenidən başlaya</button> və ya <button ${{ onn, click: e => setPage("startPage")}}>
						geri qayıda</button> bilərsiniz.
					</div>` :
						m.cards.map(city => v`
					<div class="game-card" ${{ cls, disabled: m.misclicks.includes(city)}} ${{ onn, click: e => {
						if (m.misclicks.includes(city)) return null
						if (city == m.shortestRoad[m.currentStep]) {
							if (m.currentStep == m.shortestRoad.length - 1) return m.won = pop(close => v`
								<button ${{onn, click: e => { infocards.reset(); close(); }}}>you won</button>
								`) || true
							m.currentStep++
							m.cards = getGameCards()
						} else {
							m.lives--
							if (m.lives <= 0) return pop(close => v`<div>
								Təəssüflər olsun ki səhvləriniz bütün canınızı apardı. <button ${{
									onn, click: e => { infocards.reset(); close() }
								}}>yenidən başla</button> ?
								</div>`)
							m.misclicks.push(city)
						}
					}}}>burada ${city} haqqında elə bir fakt var ki hörmətli istifadəçimiz bu faktı
					istifadə edərək kartın ${ipucus[city]} şəhərini təmsil etdiyini tapmalıdır</div>
				`)}
			</div>
		`
	}
}
