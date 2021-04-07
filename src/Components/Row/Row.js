import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { Link } from "react-router-dom";
import { modalState } from "../../store/movie";

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
    localStorage.setItem("movie", JSON.stringify(movie));
    // console.log("set");
  };
  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters ">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div
              className={` text-white row__poster ${
                isLargeRow && "row__posterLarge"
              }`}
              onClick={() => handleClick(movie)}
            >
              <img
                loading="lazy"
                id={movie.id}
                style={{ width: "15rem", height: "auto" }}
                key={movie.id}
                // onClick={() => handleClick(movie)}
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              <div className={`img-title ${isLargeRow && "img-title__large"}`}>
                {movie?.title || movie?.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={options} />}
    </div>
  );
};

export default Row;
