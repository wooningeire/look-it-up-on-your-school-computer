// https://neal.fun/infinite-craft/

const audio = new Audio();
document.body.append(audio);
audio.src = "https://github.com/wooningeire/look-it-up-on-your-school-computer/raw/main/ooh%20ooh%20temu.wav";

setInterval(() => {
	const x = JSON.parse(localStorage.getItem("infinite-craft-data"));
	let randElem1;
	do {
		randElem1 = x.elements[Math.floor(Math.random() * x.elements.length)];
	} while (randElem1.text.match(/\d{3}\d+/g));
	let randElem2;
	do {
		randElem2 = x.elements[Math.floor(Math.random() * x.elements.length)];
	} while (randElem2.text.match(/\d{3}\d+/g));

	fetch(`https://neal.fun/api/infinite-craft/pair?first=${encodeURIComponent(randElem1.text)}&second=${encodeURIComponent(randElem2.text)}`).then(x => x.json()).then((response) => {
		if (response.isNew) {
			const newData = JSON.parse(localStorage.getItem("infinite-craft-data"));
			newData.elements.push({text: response.result, emoji: response.emoji, discovered: true});
			localStorage.setItem("infinite-craft-data", JSON.stringify(newData));

			console.log(`%c${randElem1.emoji} ${randElem1.text} + ${randElem2.emoji} ${randElem2.text} = ${response.emoji} ${response.result}`, "font-size: 3em; background: #ff0;", response);

			audio.currentTime = 0;
			audio.play();
		} else if (response.result === "Nothing") {
			console.log(`%c${randElem1.emoji} ${randElem1.text} + ${randElem2.emoji} ${randElem2.text} = ${response.emoji} ${response.result}`, "color: #7f7f7f;", response);
		} else if (!x.elements.some(obj => obj.text === response.result)) {
			const newData = JSON.parse(localStorage.getItem("infinite-craft-data"));
			newData.elements.push({text: response.result, emoji: response.emoji, discovered: false});
			localStorage.setItem("infinite-craft-data", JSON.stringify(newData));

			console.log(`%c${randElem1.emoji} ${randElem1.text} + ${randElem2.emoji} ${randElem2.text} = ${response.emoji} ${response.result}`, "background: #7f0;", response);
		} else {
			console.log(`${randElem1.emoji} ${randElem1.text} + ${randElem2.emoji} ${randElem2.text} = ${response.emoji} ${response.result}`, response);
		}
	});
}, 1000);