import { useCallback, useEffect, useMemo, useState } from "react";
import {
  applyProgress,
  completeTopic,
  parseProgress,
  progressStorageKey,
} from "./courseProgress";

export function useCourseProgress() {
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return parseProgress(localStorage.getItem(progressStorageKey));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(progressStorageKey, JSON.stringify(completed));
    } catch {
      // Completion still works for this session if browser storage is unavailable.
    }
  }, [completed]);

  const markComplete = useCallback((path: string) => {
    setCompleted((previous) => completeTopic(previous, path));
  }, []);
  const courses = useMemo(() => applyProgress(completed), [completed]);
  return { courses, markComplete };
}
