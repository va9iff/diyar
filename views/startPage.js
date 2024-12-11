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

export const startPage = () => v`
	<div class="centered middle row flips startPage" ${{ style, minHeight: '100svh'}}>
		<button class="start-mode"
			${{ onn, click: e => setMode('shortestPathCities')}}>
			Kaşif
		</button>
		<button class="start-mode"
			${{ onn, click: e => setMode('ride')}}>
			Xəzinədar
		</button>
		<button class="start-mode"
			${{ onn, click: e => setMode('infocards')}}>
			Səyyar
		</button>
		<button class="start-mode"
			${{ onn, click: e => setMode('detector')}}>
			Detektor
		</button>
	</div>
`


// setTimeout(()=>setMode('ride'), 200)
