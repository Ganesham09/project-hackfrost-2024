import { parse } from 'yaml';
import { readFileSync } from 'fs';

interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
}

export async function handleTranslation(text: string, tabId?: number) {
  try {
    // Read Kestra configuration
    const kestraConfig = parse(readFileSync('kestra.yml', 'utf8'));
    
    // Call Kestra API endpoint (you'll need to replace with your actual endpoint)
    const response = await fetch('YOUR_KESTRA_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flow: kestraConfig.name,
        inputs: {
          text,
          targetLanguage: 'en' // Default to English, can be made configurable
        }
      })
    });

    const result = await response.json();

    // Send translation back to content script
    if (tabId) {
      chrome.tabs.sendMessage(tabId, {
        type: 'SHOW_TRANSLATION',
        originalText: text,
        translatedText: result.translatedText,
        position: await getSelectionPosition()
      });
    }
  } catch (error) {
    console.error('Translation failed:', error);
  }
}

async function getSelectionPosition(): Promise<{ x: number; y: number }> {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return { x: 0, y: 0 };

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  
  return {
    x: rect.left + window.scrollX,
    y: rect.bottom + window.scrollY
  };
}