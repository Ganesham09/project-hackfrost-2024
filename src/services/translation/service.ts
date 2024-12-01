import { getKestraConfig } from '../kestra/config';
import { translateWithKestra } from '../kestra/api';
import { getCachedTranslation, setCachedTranslation } from './cache';
import { env } from '../../config/env';

export async function translateText(
  text: string,
  targetLanguage: string = env.DEFAULT_TARGET_LANG
): Promise<string> {
  if (!text) return '';

  const cacheKey = `${text}-${targetLanguage}`;
  const cachedResult = getCachedTranslation(cacheKey);
  if (cachedResult) return cachedResult;

  try {
    const config = getKestraConfig();
    const result = await translateWithKestra(config, {
      text,
      targetLanguage,
    });

    setCachedTranslation(cacheKey, result.translatedText);
    return result.translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    throw error;
  }
}