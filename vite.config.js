import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api/copia': {
				target: 'https://manage.copiaevents.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/copia/, '/api/public')
			}
		}
	}
});
