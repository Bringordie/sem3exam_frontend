import React, { useState } from "react";
import { FetchMovieCount } from "./settings";
import apiFetchFacade from "./apiFacade";
import uuid from "uuid";

function MovieCount() {
  let blankTitle = "";
  const [title, setTitle] = useState(blankTitle);
  const [response, setResponse] = useState("");
  const [movies, setMovies] = useState();

  function submitHandler(event) {
    const url = FetchMovieCount() + "/" + title;
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
                  <th>Last Updated</th>
                  <th>Number of Searches</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <DisplayMovieCount
                    key={uuid()}
                    title={movie.title}
                    year={movie.year}
                    updated={movie.updated}
                    searches={movie.numberOfSearches}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function DisplayMovieCount(movies) {
  return (
    <tr>
      <td>{movies.title}</td>
      <td>{movies.year}</td>
      <td>{movies.updated}</td>
      <td>{movies.searches}</td>
    </tr>
  );
}

export default MovieCount;
