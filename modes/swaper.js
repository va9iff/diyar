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
	swapCount: 3,
	cards: [],
	winningCards: [],
	swapping: null,
	openedCities: [],
	mistakeChanges: 3,
	mistakes: 0,
}

const holderHeight = 60
const gaps = 13
const swapHeight = 40

function checkLose() {
	if (m.mistakeChanges - m.mistakes <= 0) pop(c=>v`
		<div>
		<span class="f3">Məğlub oldunuz.</span> <br><br>
		<button class="bbtn" ${{ onn, click: e=>{ swaper.reset(); c();}}}>yenidən başla</button>
		<button class="bbtn" ${{ onn, click: e=>{ setPage("startPage"); c();}}}>geri</button>
		</div>
		`, { close: false})
}

let isCardsShown = true
function getNewCities() {
		isCardsShown = false
		setTimeout(()=>{
			isCardsShown = true
			update()
		}, 30)
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
const difficulties = {
	"Asan": 3,
	"Orta": 5,
	"Çətin": 7
}
function drawerContent() {
		const steps = shortest(m.at, m.to).length - 1
		const progress = steps == 0 ? 100 : 100 / (steps+1) + 50
		return v`		
		<div class="mpadded">
			<div class="swapcards" style="margin-top: 10px"
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
						}}}><span class="centered row swapperIndexes">${j + 1}</span>
					</div>
				`
				})}	
	${m.cards.map((card, j)=> {
		if (!isCardsShown) return ""
		return v`
					<div class="bbtn swapping popping" style="transform-origin: left" ${{ cls, isSwapping: m.swapping == card.i}} ${{ 
						style, height: `${swapHeight}px`, top: `${(card.i*(gaps + holderHeight)) + Math.abs(swapHeight - holderHeight)/2}px`, backgroundColor: "#444", color: "#eee"}}>
					${0 ? `${j}=${card.i} -` : ""} ${card.city}
					</div>
		`
	})}
			</div>
			<button class="bbtn" ${{
				onn, click: e => {
					for (const [i, city] of m.winningCards.entries()) {
						if (m.cards.find(card => card.city == city).i != i) {
							m.mistakes++
							checkLose()
							return
						}
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
		m.mistakes = 0
		getNewCities()
	},
	content() {
		repaint()
		switch (m.step) {
			case "game": 
			return v`
					<div class="sticky-top" style="top: -1px; z-index: 80; transform: scale(1); padding: 15px 15px 7px 15px">
						<div class="row" style="gap: 14px;">
							<button class="bbtn" ${{ onn, click: e => setPage("startPage")}}>&lt;</button>
							<details style="position: relative">
								<summary class="bbtn row">${m.swapCount}</summary>
								<div class="row" style="position: absolute; top: 110%; gap: 6px; transform: scale(1); z-index: 19;
									filter: drop-shadow(4px 9px 4px #26262699)">
									${Object.entries(difficulties).map(([difficulty, count]) => v`
										<button class="bbtn" ${{ onn, click: e => {
											e.target.parentElement.parentElement.removeAttribute("open")
											m.swapCount = count
											swaper.reset()
										}}}>
											${difficulty}
										</button>
										`)}
								</div>
							</details>
							<button class="bbtn" ${{ onn, click: e =>{
								swaper.reset()
								moveCar(m.at)
							}}}>↻</button>
							<div class="row centered" style=" min-width: 0; gap: 9px; margin-left: auto;">${[...new Array(m.mistakeChanges).keys()].map(i => 
								i+1<=m.mistakeChanges-m.mistakes ? 
								v` <img src="./assets/img/red-cross.png" height=30 style="filter: saturate(0)" alt=""> ` :
								v` <img src="./assets/img/red-cross.png" height=30 alt="">`)}
							</div>
						</div>
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


