import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Banner from "../Components/Banner/Banner.js";
import CustomModal from "../Components/CustomModal.js";

import Row from "../Components/Row/Row.js";
import { Row as BRow } from "react-bootstrap";
import requests from "../requests.js";
const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="mx-5">
        <Row
          title={"NETFLIX ORIGINALS"}
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title={"TRENDING NOW"} fetchUrl={requests.fetchTrending} />
        <Row title={"NETFLIX ORIGINALS"} fetchUrl={requests.fetchTopRated} />
        <Row title={"ACTION MOVIES"} fetchUrl={requests.fetchActionMovies} />
        <Row title={"COMEDY MOVIES"} fetchUrl={requests.fetchComedyMovies} />
        <Row title={"HORROR MOVIES"} fetchUrl={requests.fetchHorrorMovies} />
        <Row title={"ROMCOM MOVIES"} fetchUrl={requests.fetchRomanceMovies} />
        <Row title={"DOCUMENTARIES"} fetchUrl={requests.fetchDocumentaries} />
      </div>
    </>
  );
};

export default HomePage;
