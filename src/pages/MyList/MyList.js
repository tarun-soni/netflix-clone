import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { getUserMovies } from "../../actions/movieActions";
import CardDiv from "../../Components/CardDiv/CardDiv";
import Loader from "../../Components/Loader";
import { userInfoState } from "../../store/login";
import { myListState } from "../../store/movie";
import "./MyList.scss";
const MyList = () => {
  // const [myMovies, setMyMovies] = useState();
  const [myMovies, setMyMovies] = useRecoilState(myListState);
  const [loading, setLoading] = useState(false);
  const [userInfo] = useRecoilState(userInfoState);
  // const [showRemoveBtn, setShowRemoveBtn] = useState(false);
  useEffect(() => {
    const userid = localStorage.getItem("userId");
    (async () => {
      setLoading(true);
      const data = await getUserMovies(userid);
      setMyMovies(data);
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);
  const handleClick = (movie) => {
    localStorage.setItem("movie", JSON.stringify(movie));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          <h2 className="mt-4">My Fav List</h2>
        </Col>
      </Row>

      <Row>
        {loading && (
          <div className="my-list__loader">
            <Loader />
          </div>
        )}
        {!userInfo?.isAuthenticated && (
          <Alert variant="danger" className="w-100">
            You're not logged in, Please Login
          </Alert>
        )}
      </Row>

      <Container>
        <Row>
          {myMovies?.map((movie) => (
            <div className="mx-5 my-4">
              <CardDiv
                handleClick={handleClick}
                movie={movie}
                poster_path={movie?.poster_path}
                title={movie?.name || movie?.title}
                movieId={movie?.id || movie?.movieId}
              ></CardDiv>
            </div>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default MyList;
