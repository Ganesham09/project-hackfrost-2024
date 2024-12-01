import { env } from '../../config/env';
import { KestraConfig } from './config';

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string;
  detectedLanguage: string;
}

export async function translateWithKestra(
  config: KestraConfig,
  request: TranslationRequest
): Promise<TranslationResponse> {
  try {
    const response = await fetch(env.KESTRA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.KESTRA_API_KEY}`,
      },
      body: JSON.stringify({
        flow: config.name,
        inputs: {
          text: request.text,
          targetLanguage: request.targetLanguage,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Translation API error:', error);
    throw new Error('Translation service unavailable');
  }
}