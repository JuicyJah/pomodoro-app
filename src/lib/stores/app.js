// import { browser } from '$app/environment';
import { writable } from 'svelte/store';
function createPermissionStore() {
	const permission = writable({
		notifications: false
	});

	function updatePermission(perm, val) {
		permission.update((p) => {
			p[perm] = val;
			return p;
		});
	}

	return {
		subscribe: permission.subscribe,
		update: updatePermission
	};
}

export const browserPermissions = createPermissionStore();
export const appPermissions = createPermissionStore();

// function registerWorkers() {
// 	const workers = writable({
// 		main: null,
// 		notification: null
// 	});

// 	function addWorker(name, worker) {
// 		workers.update((work) => {
// 			work[name] = worker;
// 			return work;
// 		});
// 	}

// 	return {
// 		subscribe: workers.subscribe,
// 		add: addWorker
// 	};
// }
// export const workers = registerWorkers();

function createNotifications() {
	function updateBrowserNotificationPerms(state) {
		let perm = false;
		switch (state) {
			case 'denied':
				perm = false;
				break;
			case 'granted':
				perm = true;
				break;
			default:
				perm = false;
		}
		browserPermissions.update('notifications', perm);
	}

	function requestNotifications() {
		if (typeof Notification !== 'function') return;
		if (!Notification.requestPermission) return;
		Notification.requestPermission().then((result) => {
			updateBrowserNotificationPerms(result);
		});
	}

	if ('permissions' in navigator) {
		navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
			notificationPerm.onchange = function () {
				console.log('perm changed', notificationPerm.state);
				updateBrowserNotificationPerms(notificationPerm.state);
			};
		});
	}

	requestNotifications();
}

createNotifications();
