import { maply } from "./views/maply.js"

import { update, v } from "./v.js"

export const pages = { maply }

export let current = maply

export function setPage(pageName) {
	current = pages[pageName] || pages["404"]
	if (!current) throw new Error("there's no page as " + pageName)
	update()
}

