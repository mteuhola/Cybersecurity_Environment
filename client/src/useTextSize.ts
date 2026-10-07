import { useLayoutEffect, useState } from "react";

const storageKey = "turvassa-verkossa-text-size";

function readTextSize() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved && ["100", "125", "150"].includes(saved) ? saved : "100";
  } catch {
    return "100";
  }
}

export function useTextSize() {
  const [textSize, setTextSize] = useState(readTextSize);

  useLayoutEffect(() => {
    document.documentElement.style.fontSize = `${textSize}%`;
    try {
      localStorage.setItem(storageKey, textSize);
    } catch {
      // Text resizing still works when browser storage is unavailable.
    }
  }, [textSize]);

  return { textSize, onTextSizeChange: setTextSize };
}
