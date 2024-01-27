// multiple choice
Promise.all(
    [...document.querySelectorAll(".multiple-choice-question, .definition-match-question")].map(async q => {
        for (const x of q.querySelectorAll("input[type='radio']")) {
            x.click();
            await new Promise(resolve => setTimeout(resolve, 250));
            if (q.querySelector(".correct")) break;
        }
    })
).then(() => console.log("multiple choices done"));
// to answer drag and drop questions, enable accessibility mode in the book subscription settings

// short answer
[...document.querySelectorAll(".show-answer-button")].forEach(x => (x.click(), x.click()));
setTimeout(() => {
    [...document.querySelectorAll(".short-answer-question")].forEach(q => {
        const ans = q.querySelector(".forfeit-answer").textContent;
        const t = q.querySelector("textarea");
        t.value = ans;
        t.dispatchEvent(new KeyboardEvent("input"));
        q.querySelector(".check-button").click();
    });
    console.log("short answers done");
}, 250);

// animation
Promise.all(
    [...document.querySelectorAll(".animation-controls")].map(async c => {
        c.querySelector(".start-button")?.click();
        c.querySelector("input[type='checkbox']").click();

        while (!c.querySelector("[aria-label='Play again']")) {
            await new Promise(resolve => setTimeout(resolve, 250));
            c.querySelector("[aria-label='Play']")?.click();    
        }
    })
).then(() => console.log("animations done"));

// simulation
[...document.querySelectorAll(".enter-simulation")].forEach(x => x.click());
console.log("simulations done");

// custom tools
[...document.querySelectorAll(".content-tool-container")].forEach(c => {
    c.querySelector("button").click();
});
console.log("custom tools done");