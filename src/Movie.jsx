export function Movie({ movie, showMovieBox, setShowMovieBox }) {
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
