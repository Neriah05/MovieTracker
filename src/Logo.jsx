import { Link } from "react-router-dom";

export function Logo() {
  return (
    <>
      <Link to="/" className="movie-logo">
        <p className="movie-logo">
          The
          <br />
          Movie
          <br />
          Tracker
        </p>
      </Link>
    </>
  );
}
