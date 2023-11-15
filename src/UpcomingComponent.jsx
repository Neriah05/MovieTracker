import { useState } from "react";
import { UpcomingMovie } from "./UpcomingMovie";

export function UpcomingComponent({ upcomingMovies }) {
  const [showUpcomingMoviesBoxArray, setShowUpcomingMoviesBoxArray] = useState(
    Array(upcomingMovies.length).fill(false)
  );
  return (
    <>
      <div className="heading">
        <p className="heading-title">TRENDING MOVIES</p>
      </div>

      <div className="movie-list">
        {upcomingMovies.map((movie, index) => (
          <UpcomingMovie
            key={movie.id}
            upcomingMovies={movie}
            showUpcomingMoviesBox={showUpcomingMoviesBoxArray[index]}
            setShowUpcomingMoviesBox={(value) => {
              const newArray = [...showUpcomingMoviesBoxArray];
              newArray[index] = value;
              setShowUpcomingMoviesBoxArray(newArray);
            }}
          />
        ))}
      </div>
    </>
  );
}
