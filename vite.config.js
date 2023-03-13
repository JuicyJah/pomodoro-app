import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

function envManifestPlugin() {
	return {
		name: 'env-manifest',
		apply: 'build',
		transform(src, id) {}
	};
}

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			components: path.resolve(__dirname, './src/lib/components'),
			src: path.resolve(__dirname, './src'),
			stores: path.resolve(__dirname, './src/lib/stores'),
			workers: path.resolve(__dirname, './src/lib/workers')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
