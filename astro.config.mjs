// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { markdownBase } from './scripts/markdown-base.mjs';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'MentalHealthBlog';
const owner = process.env.GITHUB_REPOSITORY?.split('/')[0];
const isUserSite = repoName.endsWith('.github.io');

const base = process.env.BASE ?? (isUserSite ? '/' : `/${repoName}/`);

export default defineConfig({
	markdown: { processor: satteri({ mdastPlugins: [markdownBase(base)] }) },
	site: process.env.SITE ?? (owner ? `https://${owner}.github.io` : 'https://SatishTA.github.io'),
	base,
	trailingSlash: 'always',
});
