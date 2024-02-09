Object.defineProperty(Object.prototype, "resource", {
	set(value) {
		Object.defineProperty(this, "resource", {
			value,
			writable: true,
			enumerable: true,
			configurable: true,
		});
		
		switch (value.activity_type) {
			case "participation":
				setTimeout(() => {
					for (let i = 0; i < value.parts; i++) {
						switch (value.type) {
							case "animation-player":
								value.postEvent({part: i, complete: true, metadata: {isTrusted: true}});
								break;

							default:
								value.postEvent({part: i, complete: true, answer: "", metadata: {isTrusted: true}});
						}
					}
				}, 0);
				break;
			
			case "challenge":
				setTimeout(() => {
					for (let i = 0; i < value.parts; i++) {
						value.postEvent({part: i, complete: 1, answer: "", metadata: {}});
					}
				}, 0);
				break;
		}
	},
	get() {
		return;
	},
});