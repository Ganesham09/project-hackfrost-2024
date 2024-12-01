import { z } from 'zod';

const envSchema = z.object({
  KESTRA_API_ENDPOINT: z.string().url(),
  KESTRA_API_KEY: z.string().min(1),
  DEFAULT_SOURCE_LANG: z.string().length(2),
  DEFAULT_TARGET_LANG: z.string().length(2),
  TRANSLATION_CACHE_DURATION: z.number().positive(),
  ENABLE_ANALYTICS: z.boolean(),
  ENABLE_OFFLINE_MODE: z.boolean(),
});

export const env = {
  KESTRA_API_ENDPOINT: import.meta.env.VITE_KESTRA_API_ENDPOINT,
  KESTRA_API_KEY: import.meta.env.VITE_KESTRA_API_KEY,
  DEFAULT_SOURCE_LANG: import.meta.env.VITE_DEFAULT_SOURCE_LANG,
  DEFAULT_TARGET_LANG: import.meta.env.VITE_DEFAULT_TARGET_LANG,
  TRANSLATION_CACHE_DURATION: Number(import.meta.env.VITE_TRANSLATION_CACHE_DURATION),
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_OFFLINE_MODE: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
} as const;