export function UpcomingMovie({
  upcomingMovies,
  showUpcomingMoviesBox,
  setShowUpcomingMoviesBox,
}) {
  const posterImageUrl = upcomingMovies.poster_path;
  const posterTitle = upcomingMovies.name || upcomingMovies.title;
  const plot = upcomingMovies.overview;
  const movieType = upcomingMovies.media_type;

  return (
    <>
      <div
        className="movie-wrapper"
        onMouseEnter={() => setShowUpcomingMoviesBox(true)}
        onMouseLeave={() => setShowUpcomingMoviesBox(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${posterImageUrl}`}
          alt={`${posterTitle} poster`}
        />

        <div className="movie-type">{movieType}</div>

        {showUpcomingMoviesBox && (
          <div className="card-container">
            <div className="image-container">
              <img
                src={`https://image.tmdb.org/t/p/original/${posterImageUrl}`}
                alt={`${posterTitle} poster`}
              />
            </div>

            <div className="content-container">
              <h3 className="card-title">{posterTitle}</h3>
              <p className="card-plot">{plot}</p>

              <button className="button-more">More</button>
            </div>
          </div>
        )}

        <p className="movie-title">{posterTitle}</p>
      </div>
    </>
  );
}
