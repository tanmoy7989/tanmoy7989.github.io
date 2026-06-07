import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const Research = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/Research",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.string(),
    tags: z.array(z.string()).optional().default([]),
    venue: z.string().optional(),
    paperUrl: z.string().url().optional(),
    codeUrl: z.string().url().optional(),
    img: z.string().optional(),
  }),
});

export const collections = { Research };
