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

const btn = {
	style, padding: `40px`
}

export const startPage = () => v`
	<div class="col box" ${{ style, minHeight: '100svh'}}>
		<button ${{ onn, click: e => alert("hi") }}>hi</button>
		<button 
			${btn}
			${{ onn, click: e => setMode('explore')}}>
			explore 
		</button>
		<button 
			${btn}
			${{ onn, click: e => setMode('shortestPathCities')}}>
			shortest
		</button>
	</div>
`
