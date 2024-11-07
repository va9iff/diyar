import { on, state, v } from "../v.js"

export const drawerHandle = () => v`

					<div class="drawer-handle-container row middle centered" 
					${{ on, touchstart: e => {
						const clientY = e.touches[0].clientY;
						state.handleTouchStartY = clientY
					}}}
					${{ on, touchmove: e=> { 
						state.handleTouchEndY = e.changedTouches[0].clientY
						if (state.handleTouchEndY - state.handleTouchStartY > 10) {
							document.querySelector(".contentside")?.scrollTo({ top: 0 })
						}
						console.log(state.handleTouchStartY, ",", state.handleTouchEndY)
					
					}}}>
						<div class="drawer-handle"></div>
					</div>
`
