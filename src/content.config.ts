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
    registerLabel: z.string().optional(),
    officialRegisterUrl: z.string().url().optional(),
    officialRegisterLabel: z.string().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
  }),
});

const newsletters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/newsletters' }),
  schema: z.object({
    title: z.string(),
    /** Calendar date the issue was sent (YYYY-MM-DD). */
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    /**
     * Event month used to list albums newest first.
     * Omit for an ongoing album such as More photos; that album sorts after dated ones until a photo carries a date.
     */
    date: z.coerce.date().optional(),
    summary: z.string(),
    kind: z.enum(['camp', 'event', 'archive']).default('camp'),
    /**
     * Camps collection id this album belongs to.
     * When omitted, an album is linked from the camp page with the same id.
     */
    camp: z.string().optional(),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: z.object({
    /** Album id — the filename of the album entry, without .md. */
    album: z.string(),
    caption: z.string(),
    alt: z.string(),
    /** Public path, for example /photos/fall-camp-2023/fall-camp-2023.jpg */
    src: z.string().startsWith('/photos/'),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { coaches, camps, events, newsletters, albums, photos };
