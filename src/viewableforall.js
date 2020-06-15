import React, { useState, useCallback, useContext } from "react";
import { FetchNoAccessReq } from "./settings";
import apiFetchFacade from "./apiFacade";

function ViewAbleForAll() {
  let blankTitle = "";
  const [title, setTitle] = useState(blankTitle);
  const [response, setResponse] = useState("");
  const [movies, setMovies] = useState();

  function submitHandler(event) {
    const url = FetchNoAccessReq() + "/" + title;
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

  const handleSearch = useCallback(() => {
    const url = FetchNoAccessReq() + "/" + title;
    apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        debugger;
        setMovies(...data);
        setResponse("");
      })
      .catch((err) => {
        setResponse(err.status);
      });
  });

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
                <DisplayMovies
                  title={movies.title}
                  year={movies.year}
                  plot={movies.plot}
                  directors={movies.directors}
                  genres={movies.genres}
                  cast={movies.cast}
                  poster={movies.poster}
                  movie={movies}
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

//function DisplayMovies(title, year, plot, directors, genres, cast, poster) {
function DisplayMovies(movies) {
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

export default ViewAbleForAll;
