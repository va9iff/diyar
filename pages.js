import { state } from "./v.js"
import { maply } from "./views/maply.js"
import { startPage } from "./views/startPage.js"

import { pop, closeLastPop, modalFuns } from "./pieces/modal/modal.js"

import { update, v, onn } from "./v.js"

export const pages = { maply, startPage }

export let current = startPage
export let currentPageId = "startPage"
export function setPage(pageName) {
	currentPageId = pageName
	current = pages[pageName] || pages["404"]
	if (!current) throw new Error("there's no page as " + pageName)
	update()
}

for (let i = 0; i <= 30; i++) {
	history.pushState({ pay: "initial junk" }, "");
}

let isBackModalShowing = false
const askForClose = () => pop(c => v`
		<span class="f2">Oyundan çıxılsın?</span> <br><br>
		<div class="row" style="gap: 19px">
			<button class="bbtn" ${{ onn, click: e => {
				window.close()
				// setTimeout(() => {
				// 	// for mobiles
				// 	window.location = "about:blank"
				//
				// })

				// this actually works for mobiles
				for (let i = 0; i <= 50; i++) { 
					window.history.back();
					pop(c => v`
						<span class="f3">
							Çıxmaq üçün geri düyməsinə basa bilərsiniz.
						</span>
						`, { close: false })
				}
			}}}>Çıxış</button>
			<button class="bbtn" ${{ onn, click: e => {
				c()
			}}}>Dəvam</button>
		</div>
	`, { onClose: () => isBackModalShowing = false})

let backClicked = 0
window.onpopstate = history.onpushstate = function(e) {
	// there is when back is pressed
	if (isBackModalShowing) {
		console.log('kokopops')
		closeLastPop()
		isBackModalShowing = false
		backClicked = 0
	}
	else if (modalFuns.length) {
		closeLastPop()
	}
	else if (currentPageId == "startPage" && backClicked >= 1) {
		console.log('opopops')
		askForClose()
		isBackModalShowing = true
		backClicked = 0
	}

	else if (currentPageId == "startPage") {
		console.log('bakik', backClicked)
		backClicked++
	}
	else if (currentPageId != "startPage") {
		console.log('to startPage')
		setPage("startPage")
	}

}

// window.addEventListener('beforeunload', function(event) {
//     event.returnValue = 'You have unsaved changes!';
// });
