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
	pathes[pathTitle] = path
}

export function fill(cityTitle, color) {
	pathes[cityTitle].setAttribute("fill", color)
	// beaware that css class fills overwrites attribute values
}

export function clear(color = "#ffffff") {
	for (const pathTitle of pathTitles) fill(pathTitle, color)
}

clear()

export { mapSvgElement }
