// import MovieLogo from "./Movie_Tracker-removebg-preview.png";

import { useEffect } from "react";
import { useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer aa4356cf1dec10b1409ceb03799dd078",
  },
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [showMovieBox, setShowMovieBox] = useState(false);

  useEffect(function () {
    async function fetchMovies() {
      try {
        const res = await fetch(
          ` https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=aa4356cf1dec10b1409ceb03799dd078`,
          options
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        // if (!data.Response === "FALSE") throw new Error("Movie not found");

        setMovies(data.results);
        // console.log(data.results);
        // const { results } = data;
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchMovies();
  }, []);

  useEffect(function () {
    async function popularMoviesData() {
      try {
        const res = await fetch(
          ` https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=aa4356cf1dec10b1409ceb03799dd078`,
          options
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        // if (!data.Response === "FALSE") throw new Error("Movie not found");

        setPopularMovies(data.results);
        // console.log(data.results);
        // const { results } = data;
      } catch (err) {
        console.error(err.message);
      }
    }

    popularMoviesData();
  }, []);

  useEffect(function () {
    async function upcomingMoviesData() {
      try {
        const res = await fetch(
          ` https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=aa4356cf1dec10b1409ceb03799dd078`,
          options
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        // if (!data.Response === "FALSE") throw new Error("Movie not found");

        setUpcomingMovies(data.results);
        // console.log(data.results);
        // const { results } = data;
      } catch (err) {
        console.error(err.message);
      }
    }

    upcomingMoviesData();
  }, []);

  return (
    <>
      <Header>
        <div className="logo-nav">
          <Logo />
          <Nav />
        </div>

        <div className="search-container">
          <Search />
        </div>
      </Header>

      <Container>
        <TrendingComponent
          movies={movies}
          showMovieBox={showMovieBox}
          setShowMovieBox={setShowMovieBox}
        />
        <PopularComponent popularMovies={popularMovies} />
        <UpcomingComponent upcomingMovies={upcomingMovies} />
      </Container>
    </>
  );
}

function Header({ children }) {
  return <header>{children}</header>;
}

function Logo() {
  return (
    <p className="movie-logo">
      The
      <br />
      Movie
      <br />
      Tracker
    </p>
  );
}

function Nav() {
  return (
    <nav className="main-nav">
      <ul className="main-nav-list">
        <li>
          <a className="main-nav-link" href="#home">
            HOME
          </a>
        </li>
        <li>
          <a className="main-nav-link" href="#movies">
            MOVIES
          </a>
        </li>
        <li>
          <a className="main-nav-link" href="#trending">
            TV SERIES
          </a>
        </li>
        <li>
          <a className="main-nav-link" href="#categories">
            CATEGORIES
          </a>
        </li>
        <li>
          <a className="main-nav-link nav-cta" href="#cta">
            Sign In
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Search() {
  return (
    <>
      <input className="search" type="text" placeholder="🔍Search movies..." />
      <button className="search-button">Search</button>
    </>
  );
}

function Container({ children }) {
  return <div className="container">{children}</div>;
}

function TrendingComponent({ movies }) {
  const [showMovieBoxArray, setShowMovieBoxArray] = useState(
    Array(movies.length).fill(false)
  );

  return (
    <>
      <div className="heading">
        <p className="heading-title">TRENDING MOVIES</p>
      </div>

      <div className="movie-list">
        {movies.map((movie, index) => (
          <Movie
            key={movie.id}
            movie={movie}
            showMovieBox={showMovieBoxArray[index]}
            setShowMovieBox={(value) => {
              const newArray = [...showMovieBoxArray];
              newArray[index] = value;
              setShowMovieBoxArray(newArray);
            }}
          />
        ))}
      </div>
    </>
  );
}

function PopularComponent({ popularMovies }) {
  return (
    <>
      <div className="heading">
        <p className="heading-title">POPULAR MOVIES</p>
      </div>

      <div className="movie-list">
        {popularMovies.map((movie) => (
          <PopularMovie key={movie.id} popularMovies={movie} />
        ))}
      </div>
    </>
  );
}

function UpcomingComponent({ upcomingMovies }) {
  return (
    <>
      <div className="heading">
        <p className="heading-title">UPCOMING MOVIES</p>
      </div>

      <div className="movie-list">
        {upcomingMovies.map((movie) => (
          <UpcomingMovie key={movie.id} upcomingMovies={movie} />
        ))}
      </div>
    </>
  );
}

function Movie({ movie, showMovieBox, setShowMovieBox }) {
  const posterPath = movie.poster_path;
  const title = movie.name || movie.title;
  const plot = movie.overview;
  const movieType = movie.media_type;

  return (
    <>
      <div
        className="movie-wrapper"
        onMouseEnter={() => setShowMovieBox(true)}
        onMouseLeave={() => setShowMovieBox(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={`${title} poster`}
        />

        <div className="movie-type">{movieType}</div>

        {showMovieBox && (
          <div className="card-container">
            <div className="image-container">
              <img
                src={`https://image.tmdb.org/t/p/original/${posterPath}`}
                alt={`${title} poster`}
              />
            </div>

            <div className="content-container">
              <h3 className="card-title">{title}</h3>
              <p className="card-plot">{plot}</p>

              <button className="button-more">More</button>
            </div>
          </div>
        )}

        <p className="movie-title">{title}</p>
      </div>
    </>
  );
}

function PopularMovie({ popularMovies }) {
  const posterImagePath = popularMovies.poster_path;
  const movieTitle = popularMovies.name || popularMovies.title;

  return (
    <>
      <div className="movie-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/original/${posterImagePath}`}
          alt={`${movieTitle} poster`}
        />
        <p className="movie-title">{movieTitle}</p>
      </div>
    </>
  );
}

function UpcomingMovie({ upcomingMovies }) {
  const posterImageUrl = upcomingMovies.poster_path;
  const posterTitle = upcomingMovies.name || upcomingMovies.title;

  return (
    <>
      <div className="movie-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/original/${posterImageUrl}`}
          alt={`${posterTitle} poster`}
        />
        <p className="movie-title">{posterTitle}</p>
      </div>
    </>
  );
}
