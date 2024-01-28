const audioSrcs = [
    "https://github.com/wooningeire/look-it-up-on-your-school-computer/raw/main/kendrick-lamar-scream-made-with-Voicemod-technology.mp3",
    "https://github.com/wooningeire/look-it-up-on-your-school-computer/raw/main/San_Jose_Strut.mp3",
];
for (const audioSrc of audioSrcs) {
    const audio = new Audio();
    document.body.append(audio);
    audio.addEventListener("loadeddata", () => {
        const f = () => {
            setTimeout(() => {
                audio.currentTime = 0;
                audio.play();
                f();
            }, Math.random() * 240_000);
        };
        audio.play();
        f();
    }, {once: true});
    audio.src = audioSrc;
}