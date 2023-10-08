import { useEffect, useRef } from "react";

export default function useClickOutside(clickOutSideHandler: () => void, listenCapturing = true) {
  
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        clickOutSideHandler();
      }
    }

    document.addEventListener("click", handleClickOutside, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClickOutside, listenCapturing);
    };
  }, [clickOutSideHandler, ref, listenCapturing]);

  return ref;
}
