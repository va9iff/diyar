import { v, put, state, onn, cls, custom } from "../v.js"

import { mapSvgElement, pathes,  clear } from "../map.js"
import { pathTitles } from "../path-titles.js"

state.input = ""
state.showingTitles = pathTitles
state.activeChip = 1

function activate(i = null) {
	if (i != null) state.activeChip = i
	const path = pathes[state.showingTitles[state.activeChip]]
	if (path) path.setAttribute("fill", "#f00")
	else alert(`no such city. input: ${state.inpupt}`)
}

const input = () => {
	if (state.activeChip >= state.showingTitles.length) state.activeChip = state.showingTitles.length - 1
	if (state.activeChip <= 0) state.activeChip = state.activeChip = 0
	if (state.activeChip != -1 && !state.showingTitles.length) state.activeChip = -1
	if (state.activeChip == -1 && state.showingTitles.length) state.activeChip = 0
	console.log(state.activeChip)
	
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
				const selected = state.showingTitles[state.activeChip]
				if (selected) {
					activate()
				}
			}
		}
	}}>
	<div class="row chips">
		${state.showingTitles.map((title,i) =>v`
			<button class="chip" 
			${{ cls, selected: state.activeChip == i }}
			${{ custom, update: el =>state.activeChip == i && el.scrollIntoView() }}
			${{ onn, click: e => activate(i)}}
			>
				${title}
			</button>
		`)}
	</div>
</div>
`
}

export const maply = () => v`
	<div class="view toprow row flips">
		<div class="mapside row grow">
			<div class="svg-container">
				${put(mapSvgElement)}
			</div>
		</div>
		<div class="contentside col grow">
			<div class="drawer-glance col middle centered" style="position: sticky; top:0">
					<h1>Diyar</h1>
			</div>
			<div class="drawer col">
				<div class="drawer-padding"></div>
					<div class="drawer-handle-container row middle centered">
						<div class="drawer-handle"></div>
					</div>
					${input()}
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<div class="ja">jaja</div>
					<button class="chip" ${{ onn, click: e => clear()}}>Təmizlə</button>
				<div class="drawer-padding-bottom"></div>
			</div>
		</div>
	</div>
`
