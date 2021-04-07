import axios from "../../axios";
import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const SearchPage = () => {
  const baseURL = "https://image.tmdb.org/t/p/original";

  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;

  let cancelToken;

  const handleChange = async (e) => {
    const searchTerm = e.target.value;

    setSearchInput(e.target.value);
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = Axios.CancelToken.source();

    try {
      const results = await axios.get(
        `search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${pageNumber}&include_adult=false`,
        { cancelToken: cancelToken.token }
      );
      console.log("Results for " + searchTerm + ": ", results.data);

      setSearchResults(results?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (movie) => {
    localStorage.setItem("movie", JSON.stringify(movie));
  };
  return (
    <Container
      style={{
        marginTop: "5rem",
        backgroundColor: "#111",
      }}
    >
      <h4>SearchPage</h4>

      <form
        className="form-inline my-2 my-lg-0   "
        // onSubmit={submitHandler}
      >
        <input
          value={searchInput}
          // onChange={(e) => setBookInput(e.target.value)}
          onChange={handleChange}
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search Books"
        />
      </form>

      <div className="row__posters">
        {searchResults?.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div
              className={`text-white row__poster`}
              onClick={() => handleClick(movie)}
            >
              <img
                loading="lazy"
                id={movie.id}
                style={{ width: "15rem", height: "auto" }}
                key={movie.id}
                src={`${baseURL}${movie.backdrop_path}`}
                alt={movie.name}
              />
              <div className={`img-title `}>{movie?.title || movie?.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default SearchPage;
