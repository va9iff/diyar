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
	// const pathTitle = path.getAttribute("title")
	// pathTitles.push(pathTitle)
	pathes[pathTitle] = path
}

console.log(pathes)

export { mapSvgElement }
