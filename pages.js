import { state } from "./v.js"
import { maply } from "./views/maply.js"
import { startPage } from "./views/startPage.js"

import { update, v } from "./v.js"

export const pages = { maply, startPage }

export let current = startPage

export function setPage(pageName) {
	current = pages[pageName] || pages["404"]
	if (!current) throw new Error("there's no page as " + pageName)
	update()
}

