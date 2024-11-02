import { v, put, state, onn, cls, custom } from "../v.js"

import { mapSvgElement  } from "../map.js"
import { pathTitles } from "../path-titles.js"

state.input = ""
state.showingTitles = pathTitles
state.activeChip = 1

const input = () => {
	if (state.activeChip >= state.showingTitles.length) state.activeChip = state.showingTitles.length - 1
	if (state.activeChip <= 0) state.activeChip = state.activeChip = 0
	if (state.activeChip != -1 && !state.showingTitles.length) state.activeChip = -1
	if (state.activeChip == -1 && state.showingTitles.length) state.activeChip = 0
	console.log(state.activeChip)
	
	return v`
<div class="city-select-field col snap-bottom">
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
				const selected = state.showingTitles[state.activeChip]
				if (selected) {
					alert(`${state.activeChip}, ${selected}`)
				}
			}
		}
	}}>
	<div class="row chips">
		${state.showingTitles.map((title,i) =>v`
			<div class="chip" 
			${{ cls, selected: state.activeChip == i }}
			${{ custom, update: el =>state.activeChip == i && el.scrollIntoView() }}
			>
				${title}
			</div>
		`)}
	</div>
</div>
`
}

export const maply = () => v`
	<div class="view toprow row">
		<div class="mapside row grow">
			<div class="svg-container">
				${put(mapSvgElement)}
			</div>
		</div>
		<div class="contentside centered middle col grow">
			${input()}
		</div>
	</div>
`
