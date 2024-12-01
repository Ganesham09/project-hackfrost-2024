import React from "react";
import ReactDOM from "react-dom";
import { TranslationPopup } from "./components/TranslationPopup";

// Create container for injection
const container = document.createElement("div");
document.body.appendChild(container);

// Initialize content script
function initializeContentScript() {
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "SHOW_TRANSLATION") {
      ReactDOM.render(
        <TranslationPopup
          originalText={request.text}
          translatedText={request.translation}
          position={request.position}
          onClose={() => {
            ReactDOM.unmountComponentAtNode(container);
          }}
        />,
        container
      );
    }
  });
}

initializeContentScript();
