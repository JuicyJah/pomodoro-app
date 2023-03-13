import { get, writable } from 'svelte/store';
import { focus25, break20, break5 } from 'stores/clock';
import { browserPermissions, appPermissions } from 'stores/app';

const STAGES = {
	focus: 'Focus',
	break: 'Break',
	intermission: 'Intermission'
};

function createPomodoro() {
	// focus, break, focus, break, focus, break, focus, break, intermission, repeat.
	// iteration = focus, break
	// after 4 x iteration, intermission

	const maxIterations = 4;
	const initialState = {
		stage: STAGES.focus,
		timer: focus25,
		activeNotification: null,
		iteration: 1
	};
	const pom = writable(initialState);

	let unsubscribe;
	function sub() {
		unsubscribe = get(pom).timer.subscribe((t) => {
			if (t.elapsed <= 0) {
				unsubscribe();
				sendNotification(get(pom).stage);
				next();
			}
		});
	}

	function sendNotification(stage) {
		if (!get(browserPermissions).notifications || !get(appPermissions).notifications) return;
		let message;
		if (stage == STAGES.focus) message = 'Time to take a break!';
		else message = 'Time to focus!';
		if (get(pom).activeNotification) get(pom).activeNotification.close();
		const n = new Notification('Pomodoro App', {
			title: 'Pomodoro',
			body: message,
			icon: '/pomodoro_icon.svg',
			image: '/pomodoro_icon.svg'
		});
		pom.update((p) => {
			p.activeNotification = n;
			return p;
		});
	}

	function start() {
		get(pom).timer.start();
		sub();
	}

	function stop() {
		get(pom).timer.stop();
		unsubscribe();
	}

	function next() {
		pom.update((state) => {
			if (state.iteration < maxIterations && state.stage == STAGES.focus) {
				state.stage = STAGES.break;
				state.timer.reset();
				state.timer = break5;
			} else if (state.stage == STAGES.focus) {
				state.stage = STAGES.intermission;
				state.timer.reset();
				state.timer = break20;
			} else {
				if (state.stage == STAGES.break) state.iteration++;
				else state.iteration = 1;
				state.stage = STAGES.focus;
				state.timer.reset();
				state.timer = focus25;
			}
			return state;
		});
	}

	return {
		subscribe: pom.subscribe,
		start,
		stop,
		next
	};
}

export const pomodoro = createPomodoro();
