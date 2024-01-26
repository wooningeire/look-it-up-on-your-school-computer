// multiple choice
[...document.querySelectorAll(".multiple-choice-question, .definition-match-question")].forEach(async q => {
    for (const x of q.querySelectorAll("input[type='radio']")) {
		x.click();
		await new Promise(resolve => setTimeout(resolve, 250));
		if (q.querySelector(".correct")) break;
    }
});
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
}, 250);

// animation
[...document.querySelectorAll(".animation-controls")].forEach(async c => {
    c.querySelector(".start-button")?.click();
    c.querySelector("input[type='checkbox']").click();

    while (!c.querySelector("[aria-label='Play again']")) {
        await new Promise(resolve => setTimeout(resolve, 250));
        c.querySelector("[aria-label='Play']")?.click();    
    }
});

// simulation
[...document.querySelectorAll(".enter-simulation")].forEach(x => x.click());
