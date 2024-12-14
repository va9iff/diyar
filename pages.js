import { state } from "./v.js"
import { maply } from "./views/maply.js"
import { startPage } from "./views/startPage.js"
import { pop, closeLastPop, modalFuns } from "./pieces/modal/modal.js"
import { onn } from "./v.js"
import { update, v } from "./v.js"

export const pages = { maply, startPage }

export let current = startPage
export let lastPageName = ""
export function setPage(pageName) {
	current = pages[pageName] || pages["404"]
	if (!current) throw new Error("there's no page as " + pageName)
	lastPageName = pageName
	update()
}


history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );
// history.pushState({ state: '' }, 'title', '' );


history.pushState({ state: '' }, 'title', '' );
history.pushState({ state: '' }, 'title', '' );
history.pushState({ state: '' }, 'title', '' );

let freshPushPreventer = false
const pushToPrevent = () => {
	freshPushPreventer = true
	history.pushState({ state: '' }, 'title', '' );
	freshPushPreventer = false
}

let askState = null
/*
null
gonna
asking
*/
window.onpopstate = history.onpushstate = function(e) {
	if (freshPushPreventer) return
	const byPassDoubleCheck = lastPageName == "startPage" && askState == null
	if (modalFuns[0]) {
		const opts = modalFuns[0].opts
		opts.close ??= true
		if (!opts.close) {
			pushToPrevent()
			return //pushToPrevent()
		}
	}
	if (/*byPassDoubleCheck ||*/ (lastPageName == "startPage" && askState == "gonna")) {
		pop(c => v`
			<span class="f3">Oyundan çıxılsın?</span> <br><br>
			<button class="bbtn" ${{ onn, click: e => {
				if (confirm("Çıxmaq istədiyinizdən əminsiniz?")) window.close()
			}}}>Çıxış</button>
			<button class="bbtn" ${{ onn, click: e => {
				c()
			} }}>Dəvam</button>
		`, { onClose: () => askState = null})
		askState = "asking"
	} else if (lastPageName == "startPage" && askState == null){ 
		setPage("startPage")
		askState = "gonna"
	} else if (lastPageName == "startPage" && askState == "asking"){
		closeLastPop()
		// setPage("startPage")
		// askState = null
	}
	if (askState == "asking") {
		closeLastPop()
	}
	if (lastPageName != "startPage") { 
		closeLastPop()
		setPage("startPage")
		askState = null
	}
	pushToPrevent()
};
