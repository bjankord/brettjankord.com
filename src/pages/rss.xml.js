import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

export const get = () => rss({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	site: import.meta.env.SITE,
	// TODO - merge this with glob from notes or have both blog posts and notes be under blog dir
	items: import.meta.glob('./blog/**/*.md'),
});
