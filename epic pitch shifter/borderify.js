document.body.style.border = "5px solid red";


const ext = globalThis.browser ?? globalThis.chrome;

(async () => {
    await import(ext.runtime.getURL("./Tone.js"));
      
    for (const element of document.querySelectorAll("audio, video")) {
        const src = Tone.context.createMediaElementSource(element);
    
        const pitchShift = new Tone.PitchShift();
        
        Tone.connect(src, pitchShift);
        Tone.connect(pitchShift, Tone.context.destination);
        
        const start = Date.now();
        setInterval(() => {
            pitchShift.pitch = 12 * Math.sin((Date.now() - start) / 1000);
        });
    }
})();