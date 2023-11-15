export function PopularMovie({
  popularMovies,
  setShowPopularMoviesBox,
  showPopularMoviesBox,
}) {
  console.log(popularMovies);

  const posterImagePath = popularMovies.poster_path;
  const movieTitle = popularMovies.name || popularMovies.title;
  const plot = popularMovies.overview;
  const movieType = popularMovies.media_type;

  return (
    <>
      <div
        className="movie-wrapper"
        onMouseEnter={() => setShowPopularMoviesBox(true)}
        onMouseLeave={() => setShowPopularMoviesBox(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${posterImagePath}`}
          alt={`${movieTitle} poster`}
        />

        <div className="movie-type">{movieType}</div>

        {showPopularMoviesBox && (
          <div className="card-container">
            <div className="image-container">
              <img
                src={`https://image.tmdb.org/t/p/original/${posterImagePath}`}
                alt={`${movieTitle} poster`}
              />
            </div>

            <div className="content-container">
              <h3 className="card-title">{movieTitle}</h3>
              <p className="card-plot">{plot}</p>

              <button className="button-more">More</button>
            </div>
          </div>
        )}

        <p className="movie-title">{movieTitle}</p>
      </div>
    </>
  );
}
