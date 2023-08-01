import { useEffect, useState, useRef } from "react";
import { StarRating } from "./StarRating";
import { useSearchMovies } from "../hooks/useMovies";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { useKey } from "../hooks/useKey";

export function MovieDetails({ id, watchedMovies, onCancelSelectedMovie, onAddWatchedMovie }) {

  // States
  const [userRating, setUserRating] = useState(0);

  // Custom Hooks
  const { movies: movie, error, isLoading } = useSearchMovies(id, true);
  useKey("Escape", onCancelSelectedMovie);
  // Refs
  const userRatingTimes = useRef(0);


  const isWatched = watchedMovies.some(watchedMovie => watchedMovie.imdbID === id);
  const watchedUserRating = watchedMovies.find(watchedMovie => watchedMovie.imdbID === id)?.userRating;

  // Destructuring movie
  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre,
  } = movie;

  // Handlers
  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(" ").at(0)),
      countRatingDecisions: userRatingTimes.current,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCancelSelectedMovie();
  }


  // Effects
  useEffect(() => {
    if (userRating) {
      userRatingTimes.current++;
    }
  }, [userRating]);
  

  useEffect(() => {
    document.title = title ? `${title} | usePopcorn 🍿` : "usePopcorn 🍿";
    return () => {
      document.title = "usePopcorn 🍿";
    };
  }, [title]);



  return (
    <div className="details">
      {isLoading && !error &&
        <Loader />}
      {!isLoading && error &&
        <ErrorMessage>Couldn't get the Movie details!</ErrorMessage>}
      {!isLoading && !error &&
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
                    onSetRating={setUserRating} />
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
        </>}
    </div>
  );
}
