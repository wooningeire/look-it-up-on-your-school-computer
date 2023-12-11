for (let i = 0; i < 50; i++) {
const co = document.body;
const v = document.querySelector("video");

const c = document.createElement("canvas");
const x = c.getContext("2d");
co.append(c);

const TARGET_WIDTH = 0.2;
const MOVEMENT_X = Math.random() * 16;
const MOVEMENT_Y = Math.random() * 16;

let down = Math.random() < 0.5;
let right = Math.random() < 0.5;
let offLeft = Math.floor(Math.random() * (innerWidth - c.width));
let offTop = Math.floor(Math.random() * (innerHeight - c.width));

c.style.cssText = "position: fixed; z-index: 2222222; box-shadow: 0 12px 48px #0000007f; opacity: 0.25; pointer-events: none";
c.width = v.videoWidth * TARGET_WIDTH;
c.height = v.videoHeight * TARGET_WIDTH;

x.drawImage(v, 0, 0, c.width, c.height);

// let lastDraw = 0;
const draw = (now) => {
// 		if (now - lastDraw > 250) {
// 				x.drawImage(v, 0, 0, c.width, c.height);
// 				lastDraw = now;
//     }

		offLeft += right ? MOVEMENT_X : -MOVEMENT_X;
		offTop += down ? MOVEMENT_Y : -MOVEMENT_Y;

		c.style.setProperty("left", `${offLeft}px`);
		c.style.setProperty("top", `${offTop}px`);

		if (offLeft + c.width >= innerWidth) {
			right = false;
		} else if (offLeft <= 0) {
			right = true;
		}

		if (offTop + c.height >= innerHeight) {
			down = false;
		} else if (offTop <= 0) {
			down = true;
		}

		h = requestAnimationFrame(draw);
};

let h = requestAnimationFrame(draw);

// setTimeout(() => cancelAnimationFrame(h), 1000);

}