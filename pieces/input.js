import { v, put, state, onn, on, cls, set, custom, style, attr, none, fn } from "../v.js"

export const input = (inputArg, local) => {
	inputArg.input ??= ""
	inputArg.activeChip ??= 0
	inputArg.list ??= []
	inputArg.showingTitles ??= inputArg.list
	if (inputArg.activeChip >= inputArg.length) inputArg.activeChip = inputArg.length - 1
	if (inputArg.activeChip <= 0) inputArg.activeChip = inputArg.activeChip = 0
	if (inputArg.activeChip != -1 && !inputArg.list.length) inputArg.activeChip = -1
	if (inputArg.activeChip == -1 && inputArg.list.length) inputArg.activeChip = 0
	
	return v`
<div class="city-select-field col">
	<input class="typing" type="text" ${{ onn, 
		input: e => {
			inputArg.input = e.target.value 
			inputArg.showingTitles = inputArg.list.filter(title=>
				title.toLocaleLowerCase().includes(inputArg.input.toLocaleLowerCase()))
		},
		keydown: e => {
			if (e.key === "ArrowLeft") {
				inputArg.activeChip--
			} else if (event.key === "ArrowRight") {
				inputArg.activeChip++
			} else if (e.key == "Enter") {
				if (inputArg.activeChip == -1) return 0
				inputArg.citySelect()
			}
		},
	}} ${{ on, 
		click: inputArg.inputClick,
	}}>
	<div class="row chips">
		${inputArg.showingTitles.map((title,i) =>v`
			<button class="chip" 
			${{ cls, selected: inputArg.activeChip == i }}
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
			${{ onn, click: e => inputArg.citySelect(i)}}
			>
				${title}
			</button>
		`)}
	</div>
</div>
`
}
