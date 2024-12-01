import { X } from "lucide-react";

interface TranslationPopupProps {
  originalText: string;
  translatedText: string;
  position: { x: number; y: number };
  onClose: () => void;
}

export function TranslationPopup({
  originalText,
  translatedText,
  position,
  onClose,
}: TranslationPopupProps) {
  // Adjust position to stay within viewport
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 320), // 320px is max-w-sm
    y: Math.min(position.y, window.innerHeight - 200), // Estimated height
  };

  return (
    <div
      style={{
        position: "fixed",
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        zIndex: 10000,
      }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm transition-opacity duration-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Translation
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {originalText}
        </p>
        <p className="text-sm text-gray-900 dark:text-gray-100">
          {translatedText}
        </p>
      </div>
    </div>
  );
}
