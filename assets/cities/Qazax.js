import { v, state, onn,  cls, on, style, attr, none, update } from "../../v.js"
import { defaultCityImg } from "../../utils/defaultCityImg.js"
export const city = {
	content: _=> v`
		<div>
			Qazax iz ə <button 
			${{ on, click: ()=> alert("veri veri")}}
			>biutiful</button> siti.
			it has some more diteyls.
			<details ${{ style, border: "2px solid red"}}>
				<summary>show more</summary>
				here is dı kontent
			</details>
		</div>
	`,
	img: defaultCityImg("Qazax.jpg"),
	imgRef: 'https://www.flickr.com/photos/isr-obvius/51756761294/in/photostream/',
}



