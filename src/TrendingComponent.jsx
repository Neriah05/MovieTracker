import { useState } from "react";
import { Movie } from "./Movie";

export function TrendingComponent({ movies }) {
  const [showMovieBoxArray, setShowMovieBoxArray] = useState(
    Array(movies.length).fill(false)
  );

  return (
    <>
      <div className="heading">
        <p className="heading-title">TRENDING</p>
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
