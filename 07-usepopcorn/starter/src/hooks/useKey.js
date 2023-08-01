
import { useEffect } from 'react';

export function useKey(key, callback) {

  useEffect(() => {
    function listener(event) {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [key, callback]);
}