import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { getUserMovies } from "../../actions/movieActions";
import CardDiv from "../../Components/CardDiv/CardDiv";
import { userInfoState } from "../../store/login";
import "./MyList.scss";
const MyList = () => {
  const baseURL = "https://image.tmdb.org/t/p/original";

  const [myMovies, setMyMovies] = useState();
  const [loading, setLoading] = useState(false);
  const [userInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const userid = localStorage.getItem("userId");
    (async () => {
      setLoading(true);
      const data = await getUserMovies(userid);
      setMyMovies(data);
      setLoading(false);
    })();
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
                baseURL={baseURL}
                handleClick={handleClick}
                movie={movie}
              ></CardDiv>
            </div>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default MyList;
const Loader = () => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        syle={{ margin: "auto", background: "#fff", display: "block" }}
        width="193px"
        height="193px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#E50914"
          stroke-width="2"
          r="16"
          stroke-dasharray="75.39822368615503 27.132741228718345"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.8474576271186441s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>{" "}
    </span>
  );
};
