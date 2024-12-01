export function initializeContextMenu() {
  chrome.contextMenus.create({
    id: 'translate-selection',
    title: 'Translate Selection',
    contexts: ['selection']
  });
}