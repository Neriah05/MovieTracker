import { useState } from "react";
import { PopularMovie } from "./PopularMovie";

export function PopularComponent({ popularMovies }) {
  const [showPopularMoviesBoxArray, setShowPopularMoviesBoxArray] = useState(
    Array(popularMovies.length).fill(false)
  );
  return (
    <>
      <div className="heading">
        <p className="heading-title">TRENDING SERIES</p>
      </div>

      <div className="movie-list">
        {popularMovies.map((movie, index) => (
          <PopularMovie
            key={movie.id}
            popularMovies={movie}
            showPopularMoviesBox={showPopularMoviesBoxArray[index]}
            setShowPopularMoviesBox={(value) => {
              const newArray = [...showPopularMoviesBoxArray];
              newArray[index] = value;
              setShowPopularMoviesBoxArray(newArray);
            }}
          />
        ))}
      </div>
    </>
  );
}
