import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import {setPage} from "../pages.js"
import { mapSvgElement, pathes,  clear, fill, fillClass, moveCar, setCoins } from "../map.js"
import { pathTitles } from "../path-titles.js"
import { neighbours, shortest, randomCity } from "../data/neighbours.js"
import { pop } from "../pieces/modal/modal.js"

function repaint() {
	clear()
	for (const [j, winningCity] of m.winningCards.entries()) {
		fill(winningCity, `hsl(${360/m.winningCards.length * j}deg, 80%, 60%)`)
	}
	for (const city of m.openedCities) {
		fill(city ,"transparent")
	}
}

const m = {
	step: "init",
	swapCount: 5,
	cards: [],
	winningCards: [],
	swapping: null,
	openedCities: []
}

const holderHeight = 70
const gaps = 20
const swapHeight = 40

function getNewCities() {
		if (m.openedCities.length >= pathTitles.length) alert("won")
		const cards = []
		for (let i = 0; i < m.swapCount; i++) {
			if (m.openedCities.length + cards.length >= pathTitles.length) break
			console.log(m.openedCities.length)
			cards.push(randomCity([...cards, ...m.openedCities]))
		}
		m.cards = cards.map(city => city) // just names
		m.winningCards = [...m.cards]
		const shuffled = shuffle(m.cards) // shuffled strings
		// const shuffled = (m.cards) // shuffled strings
		m.cards = m.cards.map(city => ({ city })) // now objs for i
		for (const card of m.cards) {
			card.i = shuffled.indexOf(card.city) // assign i
		}
}

function drawerContent() {
		const steps = shortest(m.at, m.to).length - 1
		const progress = steps == 0 ? 100 : 100 / (steps+1) + 50
		return v`		
		<div class="mpadded">
			<div class="row" style="gap: 14px; margin-bottom: 14px">
				<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
				<button class="bbtn" ${{ onn, click: e =>{
					swaper.reset()
					moveCar(m.at)
				}}}>↻</button>
			</div>
			<div class="swapcards" style="margin-top: 40px;" 
				${{ style, height: `${(holderHeight + gaps) * m.cards.length}px`}}>
				${m.cards.map((card, j) => {
					// const i = card.i
					return v`
					<div class="swapHold" 
					${{ cls, isSwapping: m.swapping == j}}
					${{ style, height: `${holderHeight}px`, top: `${j*(holderHeight + gaps)}px`,
							backgroundColor: `hsl(${360/m.winningCards.length * j}deg, 80%, 60%)`
					}}
						${{onn, click: e => {
							console.log(m.cards)
							if (m.swapping === null) {
								m.swapping = j
							} else {
								const swappingCard = m.cards.find(c => c.i == m.swapping)
								const currentCard = m.cards.find(c => c.i == j)
								const mid = swappingCard.i
								swappingCard.i = currentCard.i
								currentCard.i = mid
								m.swapping = null
							}
						}}}><span class="centered row swapperIndexes">${j}</span>
					</div>
					<div class="bbtn swapping" ${{ 
						style, height: `${swapHeight}px`, top: `${(card.i*(gaps + holderHeight)) + Math.abs(swapHeight - holderHeight)/2}px`, backgroundColor: "#444", color: "#eee"}}>
					${j}=${card.i} - ${card.city}
					</div>
				`
				})}	
			</div>
			<button class="bbtn" ${{
				onn, click: e => {
					for (const [i, city] of m.winningCards.entries()) {
						// if (m.cards.find(card => card.city == city).i != i) return
					}
					m.openedCities.push(...m.winningCards)
					getNewCities()
				}
			}}>Təsdiqlə</button>
		</div>
	`
}
const shuffle = arr => arr
	.map(value => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value)
export const swaper = {
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
		m.openedCities = []
		getNewCities()
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
						<button class="bbtn" ${{ onn, click: e => swaper.reset()}}>yenidən oyna</button>
						<button class="bbtn" ${{onn, click: e => setPage("startPage")}}>geri</button>
					</div>
				`
		}
	}
}


