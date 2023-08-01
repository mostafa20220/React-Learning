import { useState } from "react";

import { useSearchMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MovieDetails } from "./components/MovieDetails";
import { Loader } from "./components/Loader";
import { NavBar } from "./components/NavBar";
import { SearchBar } from "./components/SearchBar";
import { NumResults } from "./components/NumResults";
import { Logo } from "./components/Logo";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import { ErrorMessage } from "./components/ErrorMessage";
import { Summary } from "./components/Summary";
import { WatchedMoviesList } from "./components/WatchedMoviesList";
import { MoviesList } from "./components/MoviesList";

export default function App() {

  // States
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Custom Hooks
  const { movies, isLoading, error } = useSearchMovies(query);
  const [watchedMovies, setWatchedMovies] = useLocalStorage("watchedMovies", []);

  // Handlers
  function handleAddWatchedMovie(watchedMovie) {
    setWatchedMovies(list => [...list, watchedMovie]);
  }

  function handleDeleteWatchedMovie(watchedMovieId) {
    setWatchedMovies(list => list.filter(movie => movie.imdbID !== watchedMovieId));
  }

  function handleSelectMovie(id) {
    setSelectedMovieId(selectedMovie => selectedMovie === id ? null : id);
  }

  function handleCloseSelectedMovie() {
    setSelectedMovieId(null);
  }


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
            selectedMovieId ? <MovieDetails id={selectedMovieId} watchedMovies={watchedMovies} onCancelSelectedMovie={handleCloseSelectedMovie} onAddWatchedMovie={handleAddWatchedMovie} /> :

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