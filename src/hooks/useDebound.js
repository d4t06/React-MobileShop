import { useEffect } from 'react';
import { useState } from 'react';

function useDebounce(value, delay) {
   const [debounceValue, setDebounceValue] = useState(value);

   useEffect(() => {
      const timeId = setTimeout(() => {setDebounceValue(value)}, delay);

      return () =>{
         // setSearchResult('')
         clearTimeout(timeId)};
   }, [value]);

   return debounceValue;
}

export default useDebounce;
