import { initializeContextMenu } from './utils/contextMenu';
import { handleTranslation } from './utils/translation';

// Initialize context menu on extension install
chrome.runtime.onInstalled.addListener(() => {
  initializeContextMenu();
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'translate-selection') {
    handleTranslation(info.selectionText || '', tab?.id);
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TRANSLATE') {
    handleTranslation(request.text, sender.tab?.id);
  }
});