import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'

export default defineConfig({
	site: 'https://me.hatejs.dev',
	integrations: [sitemap(), compress()],
	markdown: {
		shikiConfig: {
			theme: 'rose-pine',
		},
	},
})
