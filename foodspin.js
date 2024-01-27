for (let i = 0; i < 10; i++) {
    const i = new Image();
    const srcs = [
        "https://media.tenor.com/qJRMLPlR3_8AAAAi/maxwell-cat.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%2812%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%28100%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%281%29%20%282%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%2810%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%2813%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%2814%29%20%282%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%2814%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%2815%29.gif",
        "https://archive.org/download/rotatingfood5/giphy%20%2816%29%20%282%29.gif",
    ];
    i.src = srcs[Math.floor(Math.random()  * srcs.length)];
    i.draggable = false;
    let x = 0;
    let y = 0;
    i.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    z-index: 9999999;
    user-select: none;
    `;
    i.addEventListener("pointerdown", e => {
        let startX = x, startY = y;
        let startClientX = e.pageX, startClientY = e.pageY;
        const onmousemove = e => {
            e.preventDefault();
            x = startX + e.pageX - startClientX;
            y = startY + e.pageY - startClientY;
            i.style.left = `${x}px`;
            i.style.top = `${y}px`;
        };
    
        addEventListener("pointermove", onmousemove);
        addEventListener("pointerup", e => {
            removeEventListener("pointermove", onmousemove);
        }, {once: true});
    });
    i.addEventListener("dblclick", () => i.remove())
    document.body.append(i);
}