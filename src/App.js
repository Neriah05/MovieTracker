import { useEffect, useState } from "react";
import StarRating from "./StarRating";

/* /////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////// */

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },

//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const avgImdbRating = average(watched.map((movie) => movie.imdbRating));

const KEY = "8a11965";

/* /////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////// */

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [showMoreButton, setShowMoreButton] = useState(false);
  const [modal, setModal] = useState(false);

  const [selectedID, setSelectedID] = useState(null);

  function toggleModal(id) {
    setModal(!modal);
    setSelectedID(id);
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  /* /////////////////////////////////////////////////////////////////////////////// */
  /* /////////////////////////////////////////////////////////////////////////////// */
  // Using asyn Method
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (!data.Response === "FALSE") throw new Error("Movie not found");

          setMovies(data.Search);
          console.log(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  /* /////////////////////////////////////////////////////////////////////////////// */
  /* /////////////////////////////////////////////////////////////////////////////// */

  return (
    <>
      <Header>
        <Logo />
        <Search query={query} setQuery={setQuery} />
      </Header>

      <TitleResult query={query} />

      <ContainerBox>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList
            movies={movies}
            showMoreButton={showMoreButton}
            setShowMoreButton={setShowMoreButton}
            onSetModal={toggleModal}
          />
        )}
        {error && <ErrorMessage message={error} />}
        {modal && (
          <Modal
            movies={movies}
            onSetModal={toggleModal}
            selectedID={selectedID}
          />
        )}
      </ContainerBox>
    </>
  );
}

/* /////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////// */

function Header({ children }) {
  return <header>{children}</header>;
}
function Logo() {
  return (
    <h1>
      The
      <br />
      Movie
      <br />
      Tracker
    </h1>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="🔍Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function TitleResult({ query }) {
  return <p className="title-result">Showing search results for: {query}</p>;
}

/* /////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////// */

function Loader() {
  return <p className="loader">Loading .....</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

function ContainerBox({ children }) {
  return <div className="container-box">{children}</div>;
}

function MovieList({ movies, showMoreButton, setShowMoreButton, onSetModal }) {
  return (
    <div className="movie-list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          showMoreButton={showMoreButton}
          setShowMoreButton={setShowMoreButton}
          onSetModal={onSetModal}
        />
      ))}
    </div>
  );
}

function Movie({ movie, showMoreButton, setShowMoreButton, onSetModal }) {
  return (
    <div
      className="movie-wrapper"
      onMouseEnter={() => setShowMoreButton(true)}
      onMouseLeave={() => setShowMoreButton(false)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />

      {showMoreButton && (
        <button
          className="more-button"
          onClick={() => onSetModal(movie.imdbID)}
        >
          More
        </button>
      )}
    </div>
  );
}

function Modal({ onSetModal, selectedID, movies }) {
  return (
    <div className="modal">
      <div className="overlay" onClick={onSetModal}></div>
      <div className="modal-content">
        {selectedID ? (
          <MovieDetails selectedID={selectedID} key={movies.imdbID} />
        ) : (
          <h2>NO MOVIE DETAILS</h2>
        )}
        <button className="close-modal" onClick={onSetModal}>
          Close
        </button>
      </div>
    </div>
  );
}

function MovieDetails({ selectedID }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0); // Add userRating state

  const {
    Title: title,
    // Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // Define the onSetRating function
  const onSetRating = (rating) => {
    // Handle the user's rating (e.g., save it to state)
    setUserRating(rating);
  };

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedID]
  );

  return (
    <>
      <div className="details-box">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="poster-box">
              <img src={poster} alt={`Poster of ${movie} movie`} />
            </div>
            <div className="contents-box">
              <h2 className="details-title">{title}</h2>
              <p className="details-released">
                {released} &bull; {runtime}
              </p>
              <p className="details-genre">{genre}</p>
              <p className="details-rating">
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </>
        )}
      </div>

      <section>
        <p className="details-plot">
          <em>{plot}</em>
        </p>
        <p className="details-actors">Starring {actors}</p>
        <p className="details-director">Directed by {director}</p>
      </section>

      <div className="rating">
        <StarRating
          maxRating={10}
          size={24}
          onSetRating={onSetRating} // Pass the onSetRating function
        />
        <p className="user-rating">User Rating: {userRating}</p>{" "}
        {/* Display the user's rating */}
      </div>
    </>
  );
}
