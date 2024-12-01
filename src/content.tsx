import React from 'react';
import { createRoot } from 'react-dom/client';
import { TranslationPopup } from './components/TranslationPopup';

// Create translation popup container
const popupContainer = document.createElement('div');
popupContainer.id = 'translation-popup-container';
document.body.appendChild(popupContainer);

const root = createRoot(popupContainer);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SHOW_TRANSLATION') {
    root.render(
      <TranslationPopup
        originalText={request.originalText}
        translatedText={request.translatedText}
        position={request.position}
        onClose={() => root.unmount()}
      />
    );
  }
});