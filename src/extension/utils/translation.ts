import { translateText } from '../../services/translation/service';

export async function handleTranslation(text: string, tabId?: number) {
  try {
    const translatedText = await translateText(text);

    // Send translation back to content script
    if (tabId) {
      chrome.tabs.sendMessage(tabId, {
        type: 'SHOW_TRANSLATION',
        originalText: text,
        translatedText,
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