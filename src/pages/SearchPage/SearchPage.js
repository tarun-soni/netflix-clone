import axios from "../../utils/axios";
import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import "./searchPage.scss";
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
        `search/multi?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${pageNumber}&include_adult=false`,
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
        height: "100vh",
      }}
    >
      <Row>
        <Col md={8}>
          <h3>Search Movies / TV shows</h3>
        </Col>
      </Row>
      <Form>
        <Form.Control
          value={searchInput}
          // onChange={(e) => setBookInput(e.target.value)}
          onChange={handleChange}
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search Movies / Series"
        />
        {/* </Form.Control> */}
      </Form>

      <Container>
        <Row className="mt-4">
          {searchResults?.map((movie) => (
            <div className="mx-5 my-4">
              <CardDiv
                baseURL={baseURL}
                handleClick={handleClick}
                movie={movie}
              ></CardDiv>
            </div>
          ))}
        </Row>

        <Row className="search_row__posters">
          {searchResults?.map((movie) => (
            <Link to={`/movie/${movie.id}`}></Link>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default SearchPage;

function CardDiv(props) {
  return (
    <Link to={`/movie/${props.movie.id}`}>
      {props.movie?.poster_path && (
        <Card
          className={`text-white row__poster1`}
          onClick={() => props.handleClick(props.movie)}
        >
          <img
            loading="lazy"
            id={props.movie.id}
            style={{
              width: "10rem",
              height: "auto",
              borderRadius: "2px",
            }}
            key={props.movie.id}
            src={`${props.baseURL}${props.movie.poster_path}`}
            alt={props.movie.name}
          />

          <div className={`search_img-title`}>
            <Card.Text>{props.movie?.title || props.movie?.name}</Card.Text>
          </div>
        </Card>
      )}
    </Link>
  );
}
