import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getUserMovies } from "../../actions/movieActions";
import CardDiv from "../../Components/CardDiv/CardDiv";
import "./MyList.scss";
const MyList = () => {
  const baseURL = "https://image.tmdb.org/t/p/original";

  const [myMovies, setMyMovies] = useState();
  const [loading, setLoading] = useState(false);
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
          {" "}
          <h2>My Fav List</h2>
        </Col>
      </Row>
      <Row>{loading && <h2>Loading..... </h2>}</Row>

      <Container>
        <Row className="mt-4">
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

        {/* <Row className="search_row__posters">
          {searchResults?.map((movie) => (
            <Link to={`/movie/${movie.id}`}></Link>
          ))}
        </Row> */}
      </Container>
    </Container>
  );
};

export default MyList;
