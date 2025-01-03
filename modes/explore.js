import { v, state, onn,  cls, style, attr, none, update } from "../v.js"
import { input } from "../pieces/input.js"
import { drawerHandle } from "../pieces/drawer-handle.js"
import {setPage} from "../pages.js"
import { mapSvgElement, pathes,  clear, fill } from "../map.js"
import { pathTitles } from "../path-titles.js"

const inputArg = { 
	citySelect, 
	list: pathTitles, 
	focusScroll: true
}

let activeCity = ""
let currentCityAsset = null

function citySelect(city) {
	activeCity = city
	if (!city) return
	inputArg.dimmed.push(city)
	inputArg.dimmed.forEach(t => fill(t, "#7f7"))
	fill(activeCity, "#ff7")
	update()
	currentCityAsset = null
	import(`../assets/cities/${city}.js`).then(asset => {
		currentCityAsset = asset.city
		update()
	}).catch(err => {
		currentCityAsset = null
	})
}

const greetings = v`, objectFit: "cover"
	<h2>Şəhərləri kəşf et!</h2>
	<p>İstədiyiniz şəhər və rayonları seçərək onlar haqda müəyyən incəliklərini öyrənə bilərsiniz. Bu məlumatlar sizə digər modlarda da kömək olacaq. Əyləncələr sizə!<p>
	<img class="splashart"
		${{ attr, src: `./imgs/core/diyar.jpg`  }}
		${{ style, maxHeight: "40svh", objectFit: "cover"}}
	>
	`

const cityInfo = city => v`
	<h1 ${{ style, color: "#262626"}}>${city}</h1>
	<img class="splashart"
		${{ attr, src: `./imgs/${activeCity.toLocaleLowerCase()}.jpg`}}>
	`

export const explore = {
	reset() {
		clear("#eee")
		activeCity = ""
		inputArg.dimmed = []
		inputArg.activeChip = 0

	},
	content() {
		return v`

				<div class="sticky-top">
					<div class="drawer-padding"></div>
					${drawerHandle()}
				</div>
				<div class="mpadded">
					<button class="pc btn backButton" 
					${{ style, borderRadiusUWU: `30px 0 0 30px`}}
					${{ onn, click: e => setPage("startPage")}}>&lt;</button>
					<button class="btn" ${{ onn, click: explore.reset}}>Təmizlə</button>
				</div>
				<div class="sticky-drawer-item">
					${input(inputArg)}
				</div>
				<div class="mpadded">
					<h1>${activeCity}</h1>
					${currentCityAsset?.content() || greetings}
					${currentCityAsset?.img ? v`<img class="splashart" 
						${{ attr, src: currentCityAsset.img }}>` : ""}
					${currentCityAsset?.imgRef ? 
						v`<a target="blank" ${{attr, 
							href: currentCityAsset.imgRef}}>şəkil qaynağı</a>` : ""}
				</div>
		`
	}
}
