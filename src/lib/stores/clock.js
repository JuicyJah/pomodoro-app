import { get, readable, writable } from 'svelte/store';

function createStopWatch() {
	const timeElapsed = readable(0, (set) => {
		const start = new Date();

		const interval = setInterval(() => {
			const current = new Date();
			set(current.getTime() - start.getTime());
		});

		return () => {
			set(0);
			clearInterval(interval);
		};
	});

	let unsubscribe;
	let previous = 0;
	const wrapper = writable(0);

	let running = false;
	function start() {
		if (running) return;
		unsubscribe = timeElapsed.subscribe((value) => {
			wrapper.set(previous + value);
		});
		running = true;
	}

	function stop() {
		if (!running) return;
		unsubscribe();
		previous = get(wrapper);
		running = false;
	}

	function reset() {
		stop();
		wrapper.set(0);
		previous = 0;
	}

	return {
		subscribe: wrapper.subscribe,
		start,
		stop,
		reset
	};
}

// start time in milliseconds
function createTimer(startTime = 0) {
	const timeElapsed = readable(0, (set) => {
		const start = new Date();

		const interval = setInterval(() => {
			const current = new Date();
			set(current.getTime() - start.getTime());
		});

		return () => {
			set(0);
			clearInterval(interval);
		};
	});

	let unsubscribe;
	let previous = startTime;
	const defaultWrapper = Object.freeze({
		elapsed: startTime,
		running: false
	});
	const wrapper = writable({ ...defaultWrapper });

	let running = false;
	function run(isrunning) {
		running = isrunning;
		wrapper.update((current) => {
			current.running = isrunning;
			return current;
		});
	}

	function start() {
		if (running) return;
		unsubscribe = timeElapsed.subscribe((value) => {
			wrapper.update((current) => {
				const calc = previous - value;
				current.elapsed = calc >= 0 ? calc : 0;
				return current;
			});
		});
		run(true);
	}

	function stop() {
		if (!running) return;
		unsubscribe();
		previous = get(wrapper).elapsed;
		run(false);
	}

	function reset() {
		stop();
		wrapper.set({ ...defaultWrapper });
		previous = startTime;
	}

	return {
		subscribe: wrapper.subscribe,
		duration: startTime,
		start,
		stop,
		reset
	};
}

export const stopWatch = createStopWatch();

const m25 = 25 * 60 * 1000;
// 25 minute timer
export const focus25 = createTimer(8000);

const m5 = 5 * 60 * 1000;
// 5 minute timer
export const break5 = createTimer(5000);

const m20 = 20 * 60 * 1000;
// 20 minute timer
export const break20 = createTimer(3000);
