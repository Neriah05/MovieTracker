// import MovieLogo from "./Movie_Tracker-removebg-preview.png";

import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { TrendingComponent } from "./TrendingComponent";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { Search } from "./Search";
import { Container } from "./Container";
import { Header } from "./Header";
import { PopularComponent } from "./PopularComponent";
import { UpcomingComponent } from "./UpcomingComponent";
import { CategoriesCmponent } from "./CategoriesCmponent";
import { TvSeriesComponent } from "./TvSeriesComponent";
import { MoviesComponent } from "./MoviesComponent";

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
  const [showPopularMoviesBox, setShowPopularMoviesBox] = useState(false);
  const [showUpcomingMoviesBox, setShowUpcomingMoviesBox] = useState(false);

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
          ` https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=aa4356cf1dec10b1409ceb03799dd078`,
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
          ` https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=aa4356cf1dec10b1409ceb03799dd078`,
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
        <PopularComponent
          popularMovies={popularMovies}
          showPopularMoviesBox={showPopularMoviesBox}
          setShowPopularMoviesBox={setShowPopularMoviesBox}
        />
        <UpcomingComponent
          upcomingMovies={upcomingMovies}
          showUpcomingMoviesBox={showUpcomingMoviesBox}
          setShowUpcomingMoviesBox={setShowUpcomingMoviesBox}
        />
      </Container>

      <Routes>
        <Route path="/movies" element={<MoviesComponent />} />
        <Route path="/tvseries" element={<TvSeriesComponent />} />
        <Route path="/categories" element={<CategoriesCmponent />} />
      </Routes>
    </>
  );
}
