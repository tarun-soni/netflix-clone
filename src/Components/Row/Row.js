import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const baseURL = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      // const response = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  const options = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error("error in trailer render", error));
    }
  };
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <>
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />

            {/* <div className="movie__title">{movie.name}</div>   */}
          </>
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={options} />}
    </div>
  );
};

export default Row;
