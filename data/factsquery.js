(()=>{
	const els = document.querySelectorAll("h1, li")
	const map = {}
	let curr = "###"
	for (const el of els) {
		if (el.tagName.toLowerCase() == "h1") {
			curr = el.innerText
		} else if (el.tagName.toLowerCase() == "li") {
			map[curr] ||= []
			map[curr].push(el.innerText)
		}
	}

	const string = JSON.stringify(map, null, "  ")
	console.log(string)
	console.log("click document to copy the JSON")
	document.onclick = e => 
	navigator.clipboard.writeText(string).then(() => alert(`Copied to clipboard`))
})()
