import { v, put, state, onn, on, cls, set, custom, attr, none } from "../v.js"

import { mapSvgElement, pathes,  clear } from "../map.js"
import { pathTitles } from "../path-titles.js"

state.input = ""
state.showingTitles = pathTitles
state.activeChip = 1 // = -1 when no match and no showingTitles
state.activeCity = "" // = -1 when no match and no showingTitles

function activate(i = null) {
	if (state.activeChip == -1) return 0
	if (i != null) state.activeChip = i
	state.activeCity = state.showingTitles[state.activeChip]
	const path = pathes[state.activeCity]
	path.setAttribute("fill", "#f00")
}

const input = () => {
	if (state.activeChip >= state.showingTitles.length) state.activeChip = state.showingTitles.length - 1
	if (state.activeChip <= 0) state.activeChip = state.activeChip = 0
	if (state.activeChip != -1 && !state.showingTitles.length) state.activeChip = -1
	if (state.activeChip == -1 && state.showingTitles.length) state.activeChip = 0
	
	return v`
<div class="city-select-field col">
	<input class="typing" type="text" ${{ onn, 
		input: e => {
			state.input = e.target.value 
			state.showingTitles = pathTitles.filter(title=>
				title.toLocaleLowerCase().includes(state.input.toLocaleLowerCase()))
		},
		keydown: e => {
			if (e.key === "ArrowLeft") {
				state.activeChip--
			} else if (event.key === "ArrowRight") {
				state.activeChip++
			} else if (e.key == "Enter") {
					activate() // it also checks
			}
		}
	}}>
	<div class="row chips">
		${state.showingTitles.map((title,i) =>v`
			<button class="chip" 
			${{ cls, selected: state.activeChip == i }}
			${{ custom, update: el => {
				if(state.activeChip == i) {
				const target = el
				const parent = el.parentElement
				const targetRect = target.getBoundingClientRect();
				const parentRect = parent.getBoundingClientRect();
				// const targetRelativeLeft = targetRect.left - parentRect.left;
				// console.log(targetRect)
				// console.log(el.parentElement.scrollLeft, el.offsetLeft)
				// parent.scrollLeft+=10
				// if(state.activeChip == i) el.parentElement.scrollLeft = el.offsetLeft -30
				// el.parentElement.scrollLeft = 
				// 		el.offsetLeft - (parentRect.left + (parentRect.width/2) - targetRect.width/2)
					parent.scrollTo({
						left: el.offsetLeft - (parentRect.left + (parentRect.width/2) - targetRect.width/2),
						behavior: 'smooth'
					});
				}
			}}}
			${{ onn, click: e => activate(i)}}
			>
				${title}
			</button>
		`)}
	</div>
</div>
`
}

function immerseContent() {
	document.body.classList.add("immerse-content")
	document.body.classList.remove("immerse-map")
}
function immerseMap() {
	document.body.classList.add("immerse-map")
	document.body.classList.remove("immerse-content")
}

immerseMap()

export const maply = () => v`
	<div class="view toprow row flips">
		<div class="mapside row">
			<div class="svg-container">
				${put(mapSvgElement)}
			</div>
		</div>
		<div class="contentside col grow" 
			${{ on, scroll: e => e.target.scrollTop > 150 ? immerseContent() : immerseMap() }}
		>
			<div class="drawer-glance col middle centered" style="position: sticky; top:0">
					<h1>Diyar</h1>
			</div>
			<div class="drawer col">
				<div class="drawer-padding"></div>
					<div class="drawer-handle-container row middle centered">
						<div class="drawer-handle"></div>
					</div>
					${input()}
					<img 
						${{ cls, splashart: 1 }} 
						${{ attr, src: state.activeCity ? `./imgs/${state.activeCity.toLocaleLowerCase()}.jpg` : none}}>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<div>jajajajaja</div>
					<button class="chip" ${{ onn, click: e => clear()}}>Təmizlə</button>
				<div class="drawer-padding-bottom"></div>
			</div>
		</div>
	</div>
`
