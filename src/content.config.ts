import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const coaches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/coaches' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number().default(99),
    pbs: z.string().optional(),
    credentials: z.string().optional(),
    photo: z.string().optional(),
    image: z.string().optional(),
    portrait: z.string().optional(),
    actionImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    videos: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    featured: z.boolean().default(false),
  }),
});

const camps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/camps' }),
  schema: z.object({
    title: z.string(),
    dates: z.string(),
    startDate: z.coerce.date(),
    ages: z.string().optional(),
    price: z.string().optional(),
    status: z.enum(['open', 'full', 'coming-soon', 'closed']).default('open'),
    registerUrl: z.string().url().optional(),
    registerCommuterUrl: z.string().url().optional(),
    registerOvernighterUrl: z.string().url().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['competition', 'travel', 'training', 'other']),
    dates: z.string(),
    startDate: z.coerce.date(),
    location: z.string().optional(),
    price: z.string().optional(),
    status: z.enum(['open', 'full', 'coming-soon', 'closed']).default('open'),
    registerUrl: z.string().url().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { coaches, camps, events };
