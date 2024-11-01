import { mapSvgString } from "./map.svg.js"

const svgString = mapSvgString
const parser = new DOMParser()
const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
const mapSvgElement = svgDoc.documentElement
mapSvgElement.classList.add("svg-image")

export const pathes = {}
export const pathTitles = []
for (const path of mapSvgElement.children) {
	const pathTitle = path.getAttribute("title")
	pathTitles.push(pathTitle)
	pathes[pathTitle] = path
}

console.log(pathes)

export { mapSvgElement }
