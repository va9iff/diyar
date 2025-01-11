import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn, update } from "../v.js"
// import { shortestPathCities } from "../modes/shortestPathCities.js"
// import { explore } from "../modes/explore.js"
import { setPage } from "../pages.js"
import { pop } from "../pieces/modal/modal.js"
import { loadwaiter } from "./loadwaiter.js"
// shortestPathCities
const setMode = async modeId => {
	const prevMode = state.mode
	// console.log(state.mode)
	state.loadwaiting = { header: modeNames[modeId], text: loadingscreentips[modeId]}
	update()
	const m = await import(`../modes/${modeId}.js`)
	state.loadwaiting = null
	update()
	/*await bro it's not async*/setPage("maply")
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


const loadingscreentips = {
	"ride": `Siz bu oyun modunda xəzinə olan 3 şəhərin hər birinə gedib qızılları toplamalısınız. Hər 3 xəzinəni əldə etdikdən sonra qalib olursunuz. Siz bu oyun modunda xəzinə yerləşdirilmiş rayonlara bir-bir getməli və onları toplamalısınız. Hansı rayondakı xəzinədən başlamağın oyunun nəticəsinə təsiri yoxdur. Avtomobilin olduğu rayonun qonşuları ekranda əks olunacaq və siz avtomobili xəzinəyə doğru aparacaq rayonu seçməlisiniz. Yalnız bütün xəzinələri əldə etdikdən sonra qalib olacaqsınız.`,
	"swaper": `Bu oyun modunda xəritədə bir neçə rayon fərqli rənglərdə göstərilir. Ekranda eyni rənglərdə və içində bu rayonların adı yazılan xanalar da olur, lakin rayonlar müvafiq rəngli xanalarda yerləşdirilmir. Rayonları xəritədəki rənglə eyni olan xanalara yerləşdirmək lazımdır. Ən çox 2 səhv edərək bütün rayonları doğru sırala və qalib ol!!!`,
	"pops": `Xəritədə göstərilən rayonun adını müəyyən edib, həmin ad əks olunan kartı seçin. Jokerdən istifadə edərək qonşu rayonların ərazilərini müəyyən edə bilərsiniz.`,
	"detector": `Avtomobili sizə məlum olmayan təyinat nöqtəsinə çatdırmalısınız. Təyinat nöqtəsini isə ondan nə qədər uzaq olduğunuzu göstərən şkaladan istifadə edərək müəyyənləşdirin.`,
	"infocards": `Bu oyun modunda bir rayondan digərinə gedən yol göstərilir. Hər rayon haqqında, biri doğru olan 3 fakt verilir. Doğru faktı taparaq növbəti rayona keçirsiniz. 3 canınız var və məqsəd, onları səmərəli istifadə edərək təyinat nöqtəsinə çatmaqdır.`,
	"shortestPathCities": `Bu oyun modunda siz hər hansısa bir rayonda olursunuz və sizə getməli olduğunuz rayon göstərilir, Sizin əsas məqsədiniz, təyinat nöqtəsinə ən qısa yolu tapmaq və bu yol üzərindəki rayonları doğru şəkildə qeyd etməkdir.`
}

const quicktexts = {
	"ride":`Bütün qızılları toplayın və qələbə çalın! Olduğunuz rayona qonşu rayonların adları sıralanacaq və maşın sizin seçdiyiniz adlı rayona doğru hərəkət edəcək.`,
	"swaper":`Verilmiş adları xəritədəki hissələrin rənkləri ilə uyğunlaşdırın. Bütün xəritəni bu şəkildə ortaya çıxardın və qələbə çalın.`,
	"pops":`Çıxan şəhərin adını verilmiş adlar arasından hansı olduğunu tapın. Kömək üçün jokerdən istifadə edə bilərsiniz!`,
	"detector":`Hədəf rayona neçə addım yaxınlıqda olduğunuzu göstərən bir detektor ilə həmin rayona yaxınlaşmağa çalışın. Çatdığınızda qalib olursunuz!`,
	"infocards":`Bu oyun modunda sizə bir rayondan digərinə getməli olduğunuz yol göstərilir. Olduğunuz rayondan digərinə gedə bilmək üçün olduğunuz rayonla bağlı doğru faktı tapmalısınız.`,
	"shortestPathCities":`Verilmiş şəhərləri birləşdirən bir yol çəkmək üçün hansı rayonlar lazım olduğunu tapın!`,
}

const modeStarter = modeId => v`
	<div class="col centered modeContainer" ${{ onn, click: e => setMode(modeId)}}>
		<button class="modeCard">
			<img style="z-index: 17" class="modeCardImage" ${{attr, src: `./assets/modeimgs/${modeId}.jpeg` }}
			${{/*maybe remove that*/ style, transform: `translateX(${-4*(rx-0.5)*2}%)`}}
	>
		</button>
		<span style="z-index: 18" class="modeName">${modeNames[modeId]}</span>
		<span class="modeText">
			${quicktexts[modeId]}
		</span>
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
