import {useEffect, useRef, useState} from 'react';

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeRef = useRef(null);

  useEffect(() => {
    timeRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearInterval(timeRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
