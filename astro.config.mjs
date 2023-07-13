import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'

export default defineConfig({
	site: 'https://example.com',
	integrations: [sitemap(), compress()],
	markdown: {
		shikiConfig: {
			theme: 'rose-pine',
		},
	},
})
