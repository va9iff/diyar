import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn } from "../v.js"

const grab = s => document.querySelector(s)

export const input = inputArg => {
	inputArg.input ??= ""
	inputArg.activeChip ??= 0
	inputArg.list ??= []
	inputArg.dimmed ??= []
	inputArg.filteredList = inputArg.list.filter(title=>
				title.toLocaleLowerCase().includes(inputArg.input.toLocaleLowerCase()))

	inputArg.showingTitles = inputArg.filteredList
	if (inputArg.activeChip >= inputArg.showingTitles.length - 1) inputArg.activeChip = inputArg.showingTitles.length - 1
	if (inputArg.activeChip <= 0) inputArg.activeChip = inputArg.activeChip = 0
	if (inputArg.activeChip != -1 && !inputArg.showingTitles.length) inputArg.activeChip = -1
	if (inputArg.activeChip == -1 && inputArg.showingTitles.length) inputArg.activeChip = 0
	
	return v`
<div class="city-select-field col">
	<input class="typing" type="text" 
	${{ set, value: inputArg.input}}
	${{ onn, 
		input: e => {
			inputArg.input = e.target.value 
		},
		keydown: e => {
			if (e.key === "ArrowLeft") {
				inputArg.activeChip--
			} else if (event.key === "ArrowRight") {
				inputArg.activeChip++
			} else if (e.key == "Enter") {
				let city = null
				if (inputArg.activeChip != -1) city = inputArg.showingTitles[inputArg.activeChip]
				inputArg.citySelect(city)
			}
		},
	}} ${{ on, 
		click: e => {
			if (inputArg.focusScroll)
				grab(".contentside")?.scrollTop < 300 ?
					grab(".contentside")?.scrollTo({ top: 300 }) : null
			inputArg.inputClick?.(e)
		},
	}}>
	<div class="row chips">
		${inputArg.showingTitles.map((title,i) =>v`
			<button class="chip" 
			${{ cls, selected: inputArg.activeChip == i, dimmed: inputArg.dimmed.includes(title) }}
			${{ custom, update: el => {
				if(inputArg.activeChip == i) {
				const target = el
				const parent = el.parentElement
				const targetRect = target.getBoundingClientRect();
				const parentRect = parent.getBoundingClientRect();
					parent.scrollTo({
						left: el.offsetLeft - parentRect.width/2 + targetRect.width/2,
						behavior: 'smooth'
					});
				}
			}}}
			${{ onn, click: e => inputArg.citySelect(inputArg.showingTitles[inputArg.activeChip = i])}}
			>
				${title}
			</button>
		`)}
	</div>
</div>
`
}
