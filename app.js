import { v, app, div, onn, b, i, state } from "./v.js"

import { current, setPage } from "./pages.js"

import { modalWrapper } from "./pieces/modal/modal.js"

const main = _ => div`
	${current()}
	${modalWrapper()}
`

document.querySelector("#loading").remove()
app("#pin", main)


