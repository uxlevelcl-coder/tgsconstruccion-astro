import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    relacionados: z.array(z.string()).optional().default([]),
    servicio: z.object({ href: z.string(), t: z.string() }).optional(),
  }),
});

export const collections = { posts };
