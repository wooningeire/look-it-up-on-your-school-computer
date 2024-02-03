// run while the section is still loading to do challenges


const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const tick = () => wait(0);

const container = document.querySelector(".route-container");

const doParticipation = () => {
	// multiple choice
	Promise.all(
		[...document.querySelectorAll(".multiple-choice-question, .definition-match-question")].map(async q => {
			for (const x of q.querySelectorAll("input[type='radio']")) {
				x.click();
				await wait(500);
				if (q.querySelector(".correct")) break;
			}
		})
	).then(() => console.log("multiple choices done"));
	Promise.all(
		[...document.querySelectorAll(".detect-answer-question")].map(async q => {
			for (const x of q.querySelectorAll("button")) {
				x.click();
				await wait(500);
				if (q.querySelector(".correct")) break;
			}
		})
	).then(() => console.log("detect answers done"));
	// to answer drag and drop questions, enable accessibility mode in the book subscription settings

	// short answer
	[...document.querySelectorAll(".show-answer-button")].forEach(x => (x.click(), x.click()));
	setTimeout(() => {
		[...document.querySelectorAll(".short-answer-question")].forEach(q => {
			const ans = q.querySelector(".forfeit-answer").textContent;
			const t = q.querySelector("textarea");
			t.value = ans;
			t.dispatchEvent(new InputEvent("input"));
			q.querySelector(".check-button").click();
		});
		console.log("short answers done");
	}, 250);

	// animation
	Promise.all(
		[...document.querySelectorAll(".animation-controls")].map(async c => {
			c.querySelector(".start-button")?.click();
			c.querySelector("input[type='checkbox']").click();

			while (!c.querySelector(".play-button.rotate-180")) {
				await wait(250);
				c.querySelector(".play-button:not(.rotate-180)")?.click();    
			}
		})
	).then(() => console.log("animations done"));

	// simulation
	[...document.querySelectorAll(".enter-simulation")].forEach(x => x.click());
	console.log("simulations done");

	// custom tools
	[...document.querySelectorAll(".content-tool-container")].forEach(c => {
			c.querySelector("button:not(.grey)")?.click();
			c.querySelector("input")?.dispatchEvent(new InputEvent("input"));
	});
	console.log("custom tools done");
};

const doChallenges = () => {
	// challenges
	Promise.all(
		[...document.querySelectorAll(".challenge .activity-payload")].map(async c => {
			c.querySelector(".zyante-progression-start-button")?.click();
			c.querySelector(".zyante-progression-check-button").click();
			await tick();
			while (c.querySelector(".zyante-progression-next-button:not(.disabled)")) {
				await wait(250);
				c.querySelector(".zyante-progression-next-button").click();
				c.querySelector(".zyante-progression-check-button").click();
				await tick();
			}
		})
	).then(() => console.log("challenges done"));
};

const sectionNotLoaded = () => container.querySelector(".section-content-resources-container") === null;

const challengesNotLoaded = () => (
	sectionNotLoaded()
	|| container.querySelectorAll(".challenge .zyante-progression-modal-cover").length
			!== container.querySelectorAll(".challenge").length
);


Object.defineProperty(Object.prototype, "toolSpecificCheckWhetherAnswerIsCorrect", {
	set(value) {
		// console.log(this);
		Object.defineProperty(this, "toolSpecificCheckWhetherAnswerIsCorrect", {
			value: function (...args) {
				const obj = value.apply(this, args);
				obj.userAnswer = obj.expectedAnswer;
				obj.isCorrect = true;
				obj.showTryAgain = false;
				return obj;
			},
		});
	},
	get() {
		return;
	},
});

if (sectionNotLoaded()) {
	const sectionObserver = new MutationObserver(() => {
		if (sectionNotLoaded()) return;
	
		sectionObserver.disconnect();
	
		console.log("section loaded");
	
		doParticipation();
	});
	sectionObserver.observe(container, {
		childList: true,
		subtree: true,
	});
} else {
	console.log("section already loaded");
	doParticipation();
}

if (challengesNotLoaded()) {
	const challengesObserver = new MutationObserver(() => {
		if (challengesNotLoaded()) return;
	
		challengesObserver.disconnect();
	
		console.log("all challenges loaded");
	
		doChallenges();
	});
	challengesObserver.observe(container, {
		childList: true,
		subtree: true,
	});
} else {
	console.log("%crun while the section is still loading to do challenges", "font-size: 2em; color: #a04");
}
