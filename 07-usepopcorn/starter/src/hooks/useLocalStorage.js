import { useState, useEffect } from 'react';

export function useLocalStorage(name, item) {

  const [value, setValue] = useState( ()=>{
    const data = JSON.parse(localStorage.getItem(name));
    return data.length ?  data : item;
  });

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [value,name]);

  return [value, setValue];
}