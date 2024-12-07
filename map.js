import { mapSvgString } from "./map.svg.js"
import { pathTitles } from "./path-titles.js"
import { coords } from "./coords.js"

const svgString = mapSvgString
const parser = new DOMParser()
const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
const mapSvgElement = svgDoc.documentElement
mapSvgElement.classList.add("svg-image")

const _coords = {}
const dots = {}
export const pathes = {}
for (const pathTitle of pathTitles) {
	const path = mapSvgElement.querySelector(`[title="${pathTitle}"]`)
	if (false) path.onclick = e => {
		const container = document.querySelector(".svg-container")
		const popups = document.querySelector(".map-popups")
		dots[pathTitle]?.remove()
		const div = document.createElement("div")
		div.style.position = "absolute"
		div.style.backgroundColor = "#f008"
		div.style.borderRadius = "50%"
		div.style.width = "15px"
		div.style.height = "15px"
		div.style.transform = "translate(-50%, -50%)"
		dots[pathTitle] = div

		const containerB = container.getBoundingClientRect()
		const svgB = mapSvgElement.getBoundingClientRect()
		const popupsB = popups.getBoundingClientRect()
		
		 const dotY = e.offsetY - popupsB.top + 40
		 const dotX = e.offsetX - popupsB.left + 40
		//
		// const rx = dotX / containerB.width  
		// const ry = dotY / containerB.height
		//
		// div.style.top = `${dotY}px`
		// div.style.left = `${dotX}px`
		
		div.style.left = (dotX / popupsB.width) * 100 + "%"
		div.style.top = (dotY / popupsB.height) * 100 + "%"

		popups.appendChild(div)
		



		_coords[pathTitle] = [div.style.left, div.style.top]
		// console.log(Object.keys(_coords).length)
		// console.log(pathTitles.length)
		// console.log(_coords)

	}
	if (true) { 
		path.removeAttribute("id")
		path.removeAttribute("title")
	}
	pathes[pathTitle] = path
}

const popc = {
	car: "Bakı",
	sprite: 0,
	destSprite: 0,
	coins: [],
	willRotate: false
}
function fixCarSprite(selectedSprite) {
	console.log(popc.sprite, popc.destSprite)

	let phaseSprite
	if (popc.destSprite == popc.sprite) {
		return
	}
	else if (popc.destSprite < popc.sprite) {
		phaseSprite = popc.sprite - 1
		if (Math.abs(popc.destSprite - popc.sprite) > 24){
			phaseSprite = popc.sprite + 4
			if (phaseSprite >= 49) phaseSprite = 0
		}
	}
	else if (popc.destSprite > popc.sprite) {
		phaseSprite = popc.sprite + 1
		if (Math.abs(popc.destSprite - popc.sprite) > 24){
			phaseSprite = popc.sprite - 4
			if (phaseSprite <= -1) phaseSprite = 48
		}
	}

	popc.sprite = phaseSprite
	const spriteString = (phaseSprite+"").padStart(2, "0")
	car.src = `assets/car/Green_JEEP_CLEAN_All_0${spriteString}.png`

	if (!popc.willRotate) {
		popc.willRotate = true
		setTimeout(()=>{
			popc.willRotate = false
			fixCarSprite()
		}, 80 / ((Math.abs(popc.destSprite - popc.sprite)) + 1))
	}

	// if (popc.sprite == selectedSprite) return null
	// let phaseSprite = selectedSprite > popc.sprite ? selectedSprite + 1 : selectedSprite < popc.sprite ? selectedSprite - 1 : popc.sprite
	// popc.sprite = phaseSprite
	// const selectedSpriteString = (phaseSprite+"").padStart(2, "0")
	// car.src = `assets/car/Green_JEEP_CLEAN_All_0${selectedSpriteString}.png`
	// if (phaseSprite !== selectedSprite) setTimeout(() => {
	// 	fixCarSprite(selectedSprite)
	// }, 400)
}

export function moveCar(city) {
	if (!city) return car.style.display = "none"
	else car.style.display = "inline"
	// clear()
	// fill(city, "red")
	const prevCoords = coords[popc.car].map(c => +c.slice(0, -1))
	const currCoords = coords[city].map(c => +c.slice(0, -1))
	const dx = currCoords[0] - prevCoords[0]
	const dy = currCoords[1] - prevCoords[1]
	const radians = Math.atan2(dy, dx);
	let degrees = radians * (180 / Math.PI);
	// car.style.transform = `rotate(${degrees}deg) scaleX(-1)`
	// car.style.rotate = `${degrees}deg`
	let selectedSprite = 0
	if (degrees < 0) {
		degrees += 360;
	}
	console.log(degrees)
	selectedSprite = Math.floor(degrees / 7.5)
	popc.destSprite = selectedSprite
	fixCarSprite()

// 
	/*if (+(coords[city][0].slice(0, -1)) > +(coords[popc.car][0].slice(0, -1))) {
		car.style.transform = "scaleX(-1)"
		car.style.translate = "50% -50%"
	} else {
		car.style.transform = "scaleX(1)"
		car.style.translate = "-50% -50%"

	}*/

	popc.car = city
	car.style.left = coords[popc.car][0]
	car.style.top = coords[popc.car][1]
}
// setInterval(()=>{
// 	moveCar(pathTitles[Math.floor(Math.random() * pathTitles.length)])
// }, 1500)
var coinElements = []
export function setCoins(cities) {
	for (const coinElement of coinElements) {
		coinElement.remove()
	}
	coinElements = []
	for (const city of cities) {
		const coinElement = document.createElement("img")
		coinElement.classList.add("coin")
		coinElement.src = "./assets/img/coin-no-dollar.png"
		coinElement.style.position = "absolute"
		coinElement.style.zIndex = "89"
		// coinElement.style.width = "30px"
		// coinElement.style.height = "30px"

		popups.appendChild(coinElement)
		coinElements.push(coinElement)
		coinElement.style.left = coords[city][0]
		coinElement.style.top = coords[city][1]
		// console.log(coinElement)
	}
}
const car = document.createElement("img")
moveCar(null)
const coins = []
car.style.position = "absolute"
// car.style.backgroundColor = "#0008"
car.style.transition = "1700ms, transform 400ms, translate 700ms"
// car.style.transformOrigin = "left"
// car.style.borderRadius = "50%"
car.style.width = "12%"
car.style.filter = "drop-shadow(0 4px 3px #0008)"
// car.style.height = "30px"
car.style.transform = "translate(-50%, -50%)"
// car.style.transformOrigin = "bottom"
car.src = "./assets/img/car.svg"

car.style.left = coords[popc.car][0]
car.style.top = coords[popc.car][1]


export const popups = document.createElement("div")
popups.classList.add("map-popups")
// setCoins(["Bakı"])
// setInterval(()=>setCoins([pathTitles[Math.floor(Math.random() * pathTitles.length)], pathTitles[Math.floor(Math.random() * pathTitles.length)], pathTitles[Math.floor(Math.random() * pathTitles.length)]]), 200)
// const popups = document.querySelector(".map-popups")
for (const coordTitle in coords) {
	const div = document.createElement("div")
	div.style.position = "absolute"
	// div.style.backgroundColor = "#f002" //VVV
	div.style.pointerEvents = "none"
	div.style.borderRadius = "50%"
	div.style.width = "15px"
	div.style.height = "15px"
	div.style.transform = "translate(-50%, -50%)"
	dots[coordTitle] = div

	div.style.left = coords[coordTitle][0]
	div.style.top = coords[coordTitle][1]
	popups.appendChild(div)
}

popups.appendChild(car)

export function fill(cityTitle, color) {
	pathes[cityTitle].setAttribute("fill", color)
	// beaware that css class fills overwrites attribute values
}

export function clear(color = "#eee", classesToo = true) {
	if (classesToo) clearClass() // we weren't caling it so class fills would stay
	for (const pathTitle of pathTitles) fill(pathTitle, color)
}

export function fillClass(cityTitle, className) {
	// pathes[cityTitle].className = className
	pathes[cityTitle].classList.add(className)
}

export function clearClass(className = "") {
	for (const pathTitle of pathTitles) pathes[pathTitle].classList = []

}

clear()

export { mapSvgElement }
