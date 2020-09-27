import React from "react";
import "./App.css";
import Row from "./Components/Row/Row.js";
import requests from "./requests";
import Banner from "./Components/Banner/Banner";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title={"NETFLIX ORIGINALS"}
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title={"TRENDING NOW"} fetchUrl={requests.fetchTrending} />"
      <Row title={"NETFLIX ORIGINALS"} fetchUrl={requests.fetchTopRated} />
      <Row title={"ACTION MOVIES"} fetchUrl={requests.fetchActionMovies} />
      <Row title={"COMEDY MOVIES"} fetchUrl={requests.fetchComedyMovies} />
      <Row title={"HORROR MOVIES"} fetchUrl={requests.fetchHorrorMovies} />
      <Row title={"ROMCOM MOVIES"} fetchUrl={requests.fetchRomanceMovies} />
      <Row title={"DOCUMENTARIES"} fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
