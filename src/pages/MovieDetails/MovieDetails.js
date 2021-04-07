import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import "./MovieDetails.scss";
import getGenre from "../../utils/getGenres.js";
const MovieDetails = () => {
  const baseURL = "https://image.tmdb.org/t/p/original";
  const [hovered, setHovered] = useState(false);
  const [movieData, setMovieData] = useState(
    JSON.parse(localStorage.getItem("movie"))
  );

  useEffect(() => {
    console.log("movieData", movieData);
  }, [localStorage, movieData]);

  const addToFav = () => {};
  return (
    <div className="top">
      <div
        style={{
          color: "white",
          height: "1000rem",
          padding: "2rem",
        }}
      >
        {/* <Row lg={8}> */}
        <Container
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}")`,
            backgroundPosition: "center center",
            opacity: "0.3",
          }}
        >
          <Col md={4}></Col>
        </Container>

        <Row>
          <Col md={4}>
            <Image
              loading="lazy"
              id={movieData.id}
              style={{ width: "15rem", height: "auto" }}
              key={movieData.id}
              // onClick={() => handleClick(movieData)}
              src={`${baseURL}${movieData.poster_path}`}
              alt={movieData.name}
              fluid
            />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>{movieData.title || movieData.name}</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                type :
                {movieData?.first_air_date
                  ? "TV series"
                  : movieData?.release_date || movieData?.media_type === "movie"
                  ? "Movie"
                  : "Not Known"}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {movieData?.overview}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      {movieData?.genre_ids?.map((m) => (
                        <h5>{getGenre(m)}</h5>
                      ))}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className={hovered ? "btn-danger" : "btn-dark"}
                    onClick={addToFav}
                  >
                    ADD TO FAV
                    <span className="svg-icon svg-icon-primary svg-icon-2x pl-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <polygon points="0 0 24 0 24 24 0 24" />
                          <path
                            d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z"
                            fill="#000000"
                            fill-rule="nonzero"
                          />
                        </g>
                      </svg>
                    </span>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        {/* </Container> */}
        {/* </Row> */}
      </div>
    </div>
  );
};

export default MovieDetails;
