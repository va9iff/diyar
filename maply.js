import { v, put } from "./v.js"

import { mapSvgElement } from "./map.js"

export const maply = () => v`
	<div class="toprow">
		<div class="mapside">
			<div class="svg-container">
				${put(mapSvgElement)}
			</div>
		</div>
		<div class="contentside">contentside</div>
	</div>
`
