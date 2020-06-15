import React, { useState } from "react";
import { FetchMovieInfoRatings } from "./settings";
import apiFetchFacade from "./apiFacade";

function MoviesForUsers() {
  let blankTitle = "";
  const [title, setTitle] = useState(blankTitle);
  const [response, setResponse] = useState("");
  const [movies, setMovies] = useState();

  function submitHandler(event) {
    const url = FetchMovieInfoRatings() + "/" + title;
    apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        setMovies(data);
        setResponse("");
      })
      .catch((err) => {
        setResponse(err.status);
      });
    event.preventDefault();
  }

  return (
    <div>
      <div className="header2">
        <h2>Search Movie</h2>
      </div>
      <div>
        <p align="center">
          Movie title:{" "}
          <input
            type="text"
            placeholder="Please enter the title of your movie"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </p>
        <button onClick={(event) => submitHandler(event)}>Search movie</button>
        {response === 404 && (
          <p>No movie by that title exist in our catalogue</p>
        )}
        {response === 500 && (
          <p>Something went wrong, please try again later</p>
        )}
        <div className="movieData"></div>
        {movies !== undefined && movies !== null && (
          <div>
            <table className="movie-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Plot</th>
                  <th>Directors</th>
                  <th>Genres</th>
                  <th>Cast</th>
                  <th>Poster</th>
                </tr>
              </thead>
              <tbody>
                <DisplayMoviesDetails
                  title={movies.title}
                  year={movies.year}
                  plot={movies.plot}
                  directors={movies.directors}
                  genres={movies.genres}
                  cast={movies.cast}
                  poster={movies.poster}
                />
              </tbody>
              <>
                <thead>
                  <tr>
                    <th>Rating</th>
                    <th>RottenTomatoes</th>
                    <th>IMDB</th>
                    <th>MetaCritics</th>
                  </tr>
                </thead>
                <tbody>
                  <DisplayMoviesRating
                    tomaCriticsRating={movies.tomatoesCriticRating}
                    tomaCriticsRatingNum={movies.tomatoesCriticRatingNum}
                    tomaViewerRating={movies.tomatoesViewerRating}
                    tomaViewerRatingNum={movies.tomatoesViewerRatingNum}
                    imdbRating={movies.imdbRating}
                    imdbVotes={movies.imdbVotes}
                    metacriticsRating={movies.metacriticsRating}
                  />
                </tbody>
              </>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function DisplayMoviesDetails(movies) {
  return (
    <tr key="">
      <td>{movies.title}</td>
      <td>{movies.year}</td>
      <td>{movies.plot}</td>
      <td>{movies.directors}</td>
      <td>{movies.genres}</td>
      <td>{movies.cast}</td>
      <td>
        <img
          className="smallhotelpicture"
          src={movies.poster}
          alt=""
          height="150"
          width="150"
        ></img>
      </td>
    </tr>
  );
}

function DisplayMoviesRating(movies) {
  return (
    <tr key="">
      <td></td>
      <td>
        Critics Rating: {movies.tomaCriticsRating}
        <br></br>
        Votes: {movies.tomaCriticsRatingNum}
        <br></br>
        Viewer Rating: {movies.tomaViewerRating}
        <br></br>
        Votes: {movies.tomaViewerRatingNum}
      </td>
      <td>
        Rating: {movies.imdbRating}
        <br></br>
        Votes: {movies.imdbVotes}
      </td>
      <td>Rating: {movies.metacriticsRating}</td>
    </tr>
  );
}

export default MoviesForUsers;
