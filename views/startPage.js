import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn, update } from "../v.js"
// import { shortestPathCities } from "../modes/shortestPathCities.js"
// import { explore } from "../modes/explore.js"
import { setPage } from "../pages.js"
import { pop } from "../pieces/modal/modal.js"
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
	detector: "Detektiv",
	shortestPathCities: "Kaşif",
	infocards: "Səyyar",
	swaper: "Nizamkar",
	pops: "Tapmaca"
}

const modeStarter = modeId => v`
	<div class="col centered modeContainer" ${{ onn, click: e => setMode(modeId)}}>
		<button class="modeCard">
			<img style="z-index: 17" class="modeCardImage" ${{attr, src: `./assets/modeimgs/${modeId}.jpeg` }}
			${{/*maybe remove that*/ style, transform: `translateX(${-4*(rx-0.5)*2}%)`}}
	>
		</button>
		<span style="z-index: 18" class="modeName">${modeNames[modeId]}</span>
	</div>
`

let isGoingFull = false
const goFullScreen = () => {
	isGoingFull = true
	document.querySelector(".toQuery").parentElement.requestFullscreen()
	document.body.classList.add("isFullScreen")
	setTimeout(()=>{
		isGoingFull = false
	}, 500)
}
let rx = 0
export const startPage = () => v`
	<div class="startPage" style="height: 100svh; width: 100%; overflow: hidden" ${{ on, mousemove: e => {
				rx = e.clientX / window.innerWidth
				update()
			}}}>
		<div class="col box" 
			style="height: 100%; width: 100%; transition: 1400ms cubic-bezier(0.27, 0.81, 0.15, 0.88);"
			${{ custom, update: el=> {
				// console.log(window.innerWidth , el.scrollWidth)
				const diff = window.innerWidth - el.scrollWidth
				console.log(diff)
				el.style.transform = `translateX(${diff * rx}px)`
			}}}
		>
			<div class="modes centered row flips">
				${[
					"ride",
					"swaper",
					"pops",
					"detector",
					"infocards",
					"shortestPathCities",
				].map(modeId=>modeStarter(modeId))}
			</div>
		</div>
		<div class="bbtn fullscreenButton" ${{
			onn, click: e => goFullScreen()
		}}>
			<img src="./assets/img/fullscreen.svg" width=55 height=55 alt="">
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


// setTimeout(()=>setMode('swaper'), 200)

if (false) setTimeout(()=>pop(c=>v`
	<div class="col grow">
		<span class="f5">Oyun tam ekranda başladılsın?</span>
		<div class="row" style="margin-top: 20px; gap: 16px">
			<button class="bbtn" ${{ on, click: c}}>Çıxış</button>
			<button class="bbtn" ${{ on, click: e => {
					goFullScreen()
					// console.log(document.querySelector(".toQuery").parentElement)
					c()
			}}}>Hə</button>
		</div>
	</div>
	`), 500)


window.addEventListener("resize", e => {
	if (isGoingFull) return
	document.body.classList.remove("isFullScreen")
})
