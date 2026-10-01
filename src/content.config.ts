import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const photoField = z.union([
	z.string(),
	z.object({ image: z.string() }),
	z.object({ src: z.string() }),
	z.object({ photo: z.string() }),
]);

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
	schema: z.object({
		type: z.enum(['blog', 'photo']).default('blog'),
		title: z.string().trim().min(1),
		draft: z.boolean().default(false),
		coverAlt: z.string().default(''),
		date: z.coerce.date(),
		description: z.string().trim().min(1),
		tags: z.array(z.string().trim().min(1)).default([]).transform((tags) => [...new Set(tags)]),
		cover: z.string().optional(),
		photos: z
			.array(photoField)
			.default([])
			.transform((items) =>
				items.map((item) => {
					if (typeof item === 'string') return item;
					if ('image' in item) return item.image;
					if ('src' in item) return item.src;
					return item.photo;
				}),
			),
		videoUrl: z
			.string()
			.optional()
			.transform((value) => (value?.trim() ? value.trim() : undefined)),
	}),
});

export const collections = { posts };
