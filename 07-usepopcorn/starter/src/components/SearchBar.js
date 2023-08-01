import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

export function SearchBar({ query, onQuery }) {

  // custom hooks
  useKey("Enter", ()=>{
    if (document.activeElement === searchInput.current) return;
    onQuery("");
    searchInput.current.focus();
  })

  // Refs
  const searchInput = useRef(null);

  // Effects
  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      ref={searchInput} />
  );
}
