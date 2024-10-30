import { mapSvgString } from "./map.svg.js"

const svgString = mapSvgString
const parser = new DOMParser()
const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
const mapSvgElement = svgDoc.documentElement
mapSvgElement.classList.add("svg-image")
// mapSvgElement.setAttribute("width", "40px")

export { mapSvgElement }
