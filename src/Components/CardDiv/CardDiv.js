import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CardDiv.scss";
export default function CardDiv(props) {
  return (
    <Link to={`/movie/${props.movie.id}`}>
      {props.movie?.poster_path && (
        <Card
          style={{ width: "10rem" }}
          className="hover-animate"
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

          <div className="fadeButton" style={{ marginTop: "-3rem" }}>
            <Card.Text className="text-white m-2">
              {props.movie?.title || props.movie?.name}
            </Card.Text>
          </div>
        </Card>
      )}
    </Link>
  );
}
