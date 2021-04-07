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
import { useParams } from "react-router";
import "./MovieDetails.scss";
import getGenre from "../../utils/getGenres.js";
const MovieDetails = () => {
  const baseURL = "https://image.tmdb.org/t/p/original";

  const [movieData, setMovieData] = useState(
    JSON.parse(localStorage.getItem("movie"))
  );

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    console.log("movieData", movieData);
    let _genres = [];
  }, [localStorage, movieData]);
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
