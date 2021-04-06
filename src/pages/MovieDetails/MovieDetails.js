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

const MovieDetails = () => {
  const baseURL = "https://image.tmdb.org/t/p/original";

  const [movieData, setMovieData] = useState(
    JSON.parse(localStorage.getItem("movie"))
  );
  useEffect(() => {
    console.log("movieData", movieData);
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
        {/* <Container
            className="banner"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}")`,
              backgroundPosition: "center center",
            }}
          >
            <Col md={4}>
              <img
                loading="lazy"
                id={movieData.id}
                style={{ width: "15rem", height: "auto" }}
                key={movieData.id}
                // onClick={() => handleClick(movieData)}
                src={`${baseURL}${movieData.poster_path}`}
                alt={movieData.name}
              />
            </Col>
            <h2> title:</h2> */}

        <Row>
          <Col md={6}>
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
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>{movieData.title || movieData.name}</h4>
              </ListGroup.Item>

              <ListGroup.Item>d: </ListGroup.Item>
              <ListGroup.Item>
                Description: {movieData?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>details:</Col>
                    <Col></Col>
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
