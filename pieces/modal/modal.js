import { v, put, update, state, onn, on, cls, set, custom, style, attr, none, fn } from "../../v.js"

const modalFuns = []
let activeModalIndex = 0

export const modalWrapper = () => {
	if (!modalFuns.length) return ""
	
	const { contentfun, opts } = modalFuns[activeModalIndex] 
	opts.close ??= true
	opts.anim ??= true
	const closeFunc = () => {
		modalFuns.splice(activeModalIndex, 1)
		update()
	}
	return  v`
	<div class="modalWrapper" 
	${{ on, click: e => opts.close && e.target.classList.contains("modalWrapper") && closeFunc() }}>
		<div class="modal" ${{ cls, popanim: opts.anim }}>
			<div class="modalHeader">
				${opts.close ? v`<div class="closeButton" ${{ on, click: closeFunc}}></div>` : ""}
			</div>
			${modalFuns[activeModalIndex].contentfun(closeFunc)}
	</div>
` 
}

// contentfun will get a way to close itself aas argument
export const pop = (contentfun, opts = {}) => {
	modalFuns.push({ contentfun: contentfun, opts })
	update()
}


pop(close => v`
	<div>
		jajaka
	</div>
`)