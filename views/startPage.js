import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn, update } from "../v.js"
// import { shortestPathCities } from "../modes/shortestPathCities.js"
// import { explore } from "../modes/explore.js"
import { setPage } from "../pages.js"
// shortestPathCities
const setMode = async modeId => {
	const m = await import(`../modes/${modeId}.js`)
	await setPage("maply")
	state.mode = m[modeId]
	state.mode.reset?.()
	update()
}


export const startPage = () => v`
	<div class="centered middle row flips startPage" ${{ style, minHeight: '100svh'}}>
		<button class="start-mode"
			${{ onn, click: e => setMode('explore')}}>
			Kəşf et 
		</button>
		<button class="start-mode"
			${{ onn, click: e => setMode('shortestPathCities')}}>
			Yol tap
		</button>
		<button class="start-mode"
			${{ onn, click: e => setMode('ride')}}>
			xəzinə toplayıcı
		</button>
	</div>
`

