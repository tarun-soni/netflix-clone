import React, { useState, useEffect } from "react";
import axios from "../axios";
import './Row.css'


const Row = ({ title, fetchUrl, isLargeRow }) => {
  const baseURL = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
      setMovies(response.data.results);
      console.log("response", response);
      return response;
    }
    fetchData();

    console.log("movies", movies);
  }, [fetchUrl]);

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {
          movies.map((movie) => (
            <>
              <img
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                key={movie.id}
                src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name} />
            </>
          ))
        }
      </div>
    </div>
  );
};

export default Row;
