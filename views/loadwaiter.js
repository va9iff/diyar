import { v, style, state, update } from "../v.js"

state.loadwaiting = null
// if falsy : don't show.
// if truth : { header, text }

export const loadwaiter = pay => v`
	<div class="col loadwaiter">
		<div class="col grow box">
			<span class="loadingscreenheader">${pay?.header}</span>		
			<span class="loadingscreentip">
				${pay?.text}
			</span>
			<span class="loader" style="margin-top: auto; ">
			</span>
			<span margin-bottom: 40px>yüklənir...</span>
		</div>
	</div>
`
