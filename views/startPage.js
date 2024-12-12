import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn, update } from "../v.js"
// import { shortestPathCities } from "../modes/shortestPathCities.js"
// import { explore } from "../modes/explore.js"
import { setPage } from "../pages.js"
// shortestPathCities
const setMode = async modeId => {
	const prevMode = state.mode
	// console.log(state.mode)
	const m = await import(`../modes/${modeId}.js`)
	await setPage("maply")
	state.modeId = modeId
	state.mode = m[modeId]
	if (prevMode) prevMode.die?.()
	;(state.mode.init || state.mode.reset)?.()
	update()
}

		// <button class="start-mode"
		// 	${{ onn, click: e => setMode('explore')}}>
		// 	İşsiz
		// </button>


const modeNames = {
	ride: "Xəzinədar",
	detector: "Detektor",
	shortestPathCities: "Kaşif",
	infocards: "Səyyar"
}

const modeStarter = modeId => v`
	<div class="col centered modeContainer" ${{ onn, click: e => setMode(modeId)}}>
		<button class="modeCard">
			<img style="z-index: 17" class="modeCardImage" ${{attr, src: `./assets/modeimgs/${modeId}.jpeg` }}>
		</button>
		<span style="z-index: 18" class="modeName">${modeNames[modeId]}</span>
	</div>
`

export const startPage = () => v`
	<div class="startPage" style="height: 100svh; width: 100%;">
		<div class="col box" style="height: 100%; width: 100%;">
			<div class="modes centered row flips">
				${[
					"ride",
					"detector",
					"infocards",
					"shortestPathCities"
				].map(modeId=>modeStarter(modeId))}
			</div>
		</div>
	</div>
`
		// <button class="start-mode"
		// 	${{ onn, click: e => setMode('shortestPathCities')}}>
		// 	Kaşif
		// </button>
		// <button class="start-mode"
		// 	${{ onn, click: e => setMode('ride')}}>
		// 	Xəzinədar
		// </button>
		// <button class="start-mode"
		// 	${{ onn, click: e => setMode('infocards')}}>
		// 	Səyyar
		// </button>
		// <button class="start-mode"
		// 	${{ onn, click: e => setMode('detector')}}>
		// 	Detektor
		// </button>


// setTimeout(()=>setMode('detector'), 200)
