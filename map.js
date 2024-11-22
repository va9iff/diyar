import { mapSvgString } from "./map.svg.js"
import { pathTitles } from "./path-titles.js"

const svgString = mapSvgString
const parser = new DOMParser()
const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
const mapSvgElement = svgDoc.documentElement
mapSvgElement.classList.add("svg-image")

export const pathes = {}
for (const pathTitle of pathTitles) {
	const path = mapSvgElement.querySelector(`[title="${pathTitle}"]`)
	if (true) path.removeAttribute("id")
	pathes[pathTitle] = path
}

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
