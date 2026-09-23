import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value by a specified delay in milliseconds (default 300ms).
 * Useful for search inputs to avoid triggering re-renders or expensive computations on every keystroke.
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
