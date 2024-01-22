// https://www.youtube.com/watch?v=URDQOb81cBg

document.querySelector("video").playbackRate = 8;

const div = document.createElement("div");
div.style.cssText = `
	width: 100%;
	aspect-ratio: 16/9;
	text-align: center;
	position: absolute;
	font-family: Impact;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	font-size: 24rem;
	white-space: nowrap;
	text-shadow: 1rem 0 #000, 0 1rem #000, -1rem 0 #000, 0 -1rem #000,
				.7rem .7rem #000, .7rem -.7rem #000, -.7rem -.7rem #000, -.7rem .7rem #000;
`;
document.querySelector(".html5-video-container").append(div);
div.innerHTML = `
	<div>THE OPPENING</div>

	<div>THE WHOPPENING</div>
`