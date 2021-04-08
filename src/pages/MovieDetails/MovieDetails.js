import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Image,
  Jumbotron,
  ListGroup,
  Row,
} from "react-bootstrap";
import "./MovieDetails.scss";
import getGenre from "../../utils/getGenres.js";
import {
  addMovie,
  getUserMovies,
  removeMovie,
} from "../../actions/movieActions";
import { myListState } from "../../store/movie";
import { useRecoilState } from "recoil";
import Loader from "../../Components/Loader";
import { useHistory } from "react-router";
import { userInfoState } from "../../store/login";
import {
  addedMovieAlert,
  plsLoginAlert,
  removeMovieAlert,
} from "../../store/alerts";
const MovieDetails = () => {
  const history = useHistory();
  const [myMovies, setMyMovies] = useRecoilState(myListState);
  const [userInfo] = useRecoilState(userInfoState);
  const [alreadyFav, setAlreadyFav] = useState(false);
  const baseURL = "https://image.tmdb.org/t/p/original";
  const [hovered, setHovered] = useState(false);
  const [movieData, setMovieData] = useState(
    JSON.parse(localStorage.getItem("movie"))
  );
  const [loading, setLoading] = useState(false);
  const [compareData, setCompareData] = useState([]);
  const [, setShowPlsLoginAlert] = useRecoilState(plsLoginAlert);
  const [, setAddMovieAlert] = useRecoilState(addedMovieAlert);
  const [, setRemoveMovieAlert] = useRecoilState(removeMovieAlert);
  const addToFav = async () => {
    if (!userInfo.isAuthenticated) {
      setShowPlsLoginAlert(true);
    } else {
      let _genres = [];
      movieData.genre_ids.map((m) => {
        _genres.push(getGenre(m));
        return m;
      });

      const res = await addMovie({
        movieId: movieData.id,
        title: movieData?.title ? movieData.title : movieData.name,
        type: "",
        overview: movieData.overview,
        genres: _genres,

        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        vote_average: movieData.vote_average,
        user: {
          _id: "606dcfb7f6cfdc29e0c37585",
          name: "User One",
          email: "u1@example.com",
        },
      });
      if (res === "sucess") setAddMovieAlert(true);
    }
  };

  const removeFav = async () => {
    console.log("remove");
    const id = movieData.id || movieData?.movieId;
    const deleteres = await removeMovie(id.toString());
    if (deleteres === "success") setRemoveMovieAlert(true);

    history.push("/mylist");
  };
  useEffect(() => {
    console.log("movieData", movieData);
    window.scrollTo(0, 0);

    const userid = localStorage.getItem("userId");
    (async () => {
      setLoading(true);
      const data = await getUserMovies(userid);
      setMyMovies(data);
      setLoading(false);
    })();
  }, [localStorage, movieData]);

  useEffect(() => {
    const currentId = movieData.id || movieData.movieId;

    setCompareData(
      myMovies?.map((m) => {
        console.log(`m`, m);
        return m.movieId === currentId.toString();
      })
    );
  }, [myMovies, alreadyFav]);

  useEffect(() => {
    if (compareData !== []) {
      if (compareData?.includes(true)) setAlreadyFav(true);
    }
  }, [compareData, myMovies]);
  return (
    <div className="top ">
      {console.log(`compareData`, compareData)}
      <div
        style={{
          color: "white",
          height: "1000rem",
          padding: "2rem",
        }}
      >
        <Row>
          {loading && (
            <div className="my-list__loader">
              <Loader />
            </div>
          )}
          {/* {!userInfo?.isAuthenticated && (
            <Alert variant="danger" className="w-100">
              You're not logged in, Please Login
            </Alert>
          )} */}
        </Row>
        <Jumbotron
          className="banner demo-wrap"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}")`,
            backgroundSize: "cover",
            opacity: "0.9",
          }}
        >
          <div className="jumbotron-content">
            <h2>{movieData?.name || movieData?.title}</h2>
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
            {/* <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p> */}
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
        </Jumbotron>

        <Row>
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
                    onClick={alreadyFav ? removeFav : addToFav}
                  >
                    {alreadyFav ? "REMOVE FROM FAV" : "ADD TO FAV"}
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
