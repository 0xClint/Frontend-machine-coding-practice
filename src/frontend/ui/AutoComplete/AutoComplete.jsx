import { useEffect, useRef, useState } from "react";
import "./AutoComplete.css";

export const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const searchRef = useRef(null);

  const fetchData = async () => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );

      if (!res.ok) return;
      const result = await res.json();
      console.log(result);
      setSuggestions(result.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (event) => {
    setQuery(event.target.value);
    fetchData;
  };

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const handlePoppup = (event) => {
        if(searchRef.current && !searchRef.current.contains(event.target)){
            setSuggestions([]);
        }
    };
    document.addEventListener("click", handlePoppup);
  }, []);

  return (
    <div>
      <h2>AutoComplete</h2>

      <div className="search-container">
        <input
          className="search-input"
          ref={searchRef}
          value={query}
          onChange={handleOnChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map(({ id, name }) => (
              <li 
              tabIndex={0}
              key={id} className="suggestion-item">
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
