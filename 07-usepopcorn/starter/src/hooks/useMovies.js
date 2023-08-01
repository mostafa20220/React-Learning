import { useState, useEffect } from "react";



export function useSearchMovies(query, isSearchById = false) {

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const apiKey = "f982949a";

  useEffect(() => {

    const abortController = new AbortController();

    if (query.length < 3) {
      setMovies([]);
      return;
    }

    const searchBy = isSearchById ? "i" : "s";
    const url = `https://www.omdbapi.com/?${searchBy}=${query}&apikey=${apiKey}`;

    setIsLoading(true);
    setError(null);
    setMovies([]);
    fetch(url, { signal: abortController.signal })
      .then((res) => {

        if (!res.ok)
          throw new Error(res);
        return res.json();

      })
      .then((data) => {

        if (data.Error) throw (data.Error);

        setMovies(data.Search || data);

      }).catch((err) => {

        if (err.name !== "AbortError") {
          setError(err);
        }
        setMovies([]);

      }).finally(() => setIsLoading(false));

    return function () {
      abortController.abort();
    };

  }, [query, isSearchById]);


  return { movies, error, isLoading };

}