import { v, app, div, onn, b, i, state } from "./v.js"

import { current, setPage } from "./pages.js"


const main = _ => div`
	${current()}
`

app("#pin", main)
