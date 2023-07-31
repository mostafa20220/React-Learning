import { useEffect, useState } from "react";
import StarRating from "./StarRating";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);


  function handleAddWatchedMovie(watchedMovie) {
    setWatchedMovies(list => [...list, watchedMovie]);
  }

  function handleDeleteWatchedMovie(watchedMovieId) {
    setWatchedMovies(list => list.filter(movie => movie.imdbID !== watchedMovieId));
  }

  function handleSelectMovie(id) {
    setSelectedMovieId(selectedMovie => selectedMovie === id ? null : id);
  }

  function handleCancelSelectedMovie() {
    setSelectedMovieId(null);
  }

  const apiKey = "f982949a";

  useEffect(() => {

    const abortController = new AbortController();

    if (query.length < 3) return;

    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

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
        setMovies(data.Search);

      }).catch((err) => {

        if (err.name !== "AbortError") {
          setError(err);
        }
        setMovies([]);

      }).finally(() => setIsLoading(false));

    return function () {
      abortController.abort();
    };

  }, [query]);


  return (
    <>

      <NavBar>
        <Logo />
        <SearchBar query={query} onQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>


      <Main>
        <Box>
          {
            !query && !isLoading && !error &&
            <p className="loader"> Search results here! </p>
          }
          {
            query && isLoading && !error &&
            <Loader />
          }
          {
            query && !isLoading && error &&
            <ErrorMessage> {error} </ErrorMessage>
          }
          {
            query && !isLoading && !error &&
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          }


        </Box>

        <Box>
          {
            selectedMovieId ? <MovieDetails id={selectedMovieId} apiKey={apiKey} watchedMovies={watchedMovies} onCancelSelectedMovie={handleCancelSelectedMovie} onAddWatchedMovie={handleAddWatchedMovie} /> :

              <>
                <Summary watched={watchedMovies} />
                <WatchedMoviesList watched={watchedMovies} onDeleteWatchedMovie={handleDeleteWatchedMovie} />
              </>
          }
        </Box>
      </Main>


    </>
  );
}

function MovieDetails({ id, apiKey, watchedMovies, onCancelSelectedMovie, onAddWatchedMovie }) {

  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watchedMovies.some(watchedMovie => watchedMovie.imdbID === id);
  const watchedUserRating = watchedMovies.find(watchedMovie => watchedMovie.imdbID === id)?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatchedMovie(newWatchedMovie);
    onCancelSelectedMovie();
  }



  useEffect(() => {

    const escapeHandler = e => e.key === "Escape" && onCancelSelectedMovie();
    document.addEventListener('keydown', escapeHandler);
    return () => document.removeEventListener('keydown', escapeHandler);

  }, [onCancelSelectedMovie]);

  useEffect(() => {

    const abortController = new AbortController();

    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

    setIsLoading(true);
    setError(null);

    fetch(url, { signal: abortController.signal })
      .then(res => {
        if (!res.ok) throw new Error(res);
        return res.json();
      }
      ).then(data => {
        if (data.Error) throw new Error(data.Error);
        setMovie(data);
      }
      ).catch(err => err.name !== "AbortError" && console.error(err)
      ).finally(() => setIsLoading(false));

    return function () {
      abortController.abort();
    };
  }, [id, apiKey]);


  useEffect(() => {
    document.title = title ? `${title} | usePopcorn 🍿` : "usePopcorn 🍿";
    return () => {
      document.title = "usePopcorn 🍿";
    };
  }, [title]);


  return (
    <div className="details">
      {isLoading && !error &&
        <Loader />
      }
      {
        !isLoading && error &&
        <ErrorMessage>Couldn't get the Movie details!</ErrorMessage>
      }
      {
        !isLoading && !error &&
        <>
          <header>
            <button className="btn-back" onClick={onCancelSelectedMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add"
                      onClick={handleAddWatchedMovie}
                    >
                      + Add to Watched Movies
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie with {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }
    </div>
  );
}


function Loader() {
  return (
    <p className="loader">
      Loading...
      <span role="img">🍿</span>
    </p>
  );
}


function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  );
}

function SearchBar({ query, onQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}


function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  );
}



function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function ErrorMessage({ children }) {
  return (
    <div className="error">
      <span> 🚫 </span>
      {children}
    </div>
  );
}


function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatchedMovie }) {

  return (<ul className="list">
    {watched.map(movie => <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatchedMovie={onDeleteWatchedMovie} />)}
  </ul>);
}

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={onDeleteWatchedMovie.bind(null, movie.imdbID)} >X</button>
      </div>
    </li>
  );
}

function MoviesList({ movies, onSelectMovie }) {

  return (<ul className="list list-movies">
    {movies?.map((movie) => <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />)}
  </ul>);
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={onSelectMovie.bind(this, movie.imdbID)} >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}