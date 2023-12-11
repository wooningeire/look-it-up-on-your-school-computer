await import("https://unpkg.com/tone");

const src = Tone.context.createMediaElementSource(document.querySelector("video"));

const pitchShift = new Tone.PitchShift();

Tone.connect(src, pitchShift);
Tone.connect(pitchShift, Tone.context.destination);

const start = Date.now();
setInterval(() => {
	pitchShift.pitch = 24 * Math.sin((Date.now() - start) / 1000);
});