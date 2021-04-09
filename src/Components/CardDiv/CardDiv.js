import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CardDiv.scss";
export default function CardDiv({
  movie,
  handleClick,
  poster_path,
  movieId,
  title,
}) {
  const baseURL = "https://image.tmdb.org/t/p/original";
  return (
    <Link to={`/movie/${movieId}`}>
      {poster_path && (
        <Card
          style={{ width: "10rem" }}
          className="hover-animate"
          onClick={() => handleClick(movie)}
        >
          <img
            // loading="lazy"
            id={movieId}
            style={{
              width: "10rem",
              height: "auto",
              borderRadius: "2px",
            }}
            key={movieId}
            src={`${baseURL}${poster_path}`}
            alt={title}
          />

          <div className="fadeButton" style={{ marginTop: "-3rem" }}>
            <Card.Text className="text-white m-2">{title}</Card.Text>
          </div>
        </Card>
      )}
    </Link>
  );
}
