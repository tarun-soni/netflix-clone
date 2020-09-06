import React from "react";
import "./App.css";
import Row from "./Components/Row";
import requests from "./requests";

function App() {
  return (
    <div className="App">
      <Row
        title={"NETFLIX ORIGINALS"}
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      {console.log(
        "requests.fetchNetflixOriginals",
        requests.fetchNetflixOriginals
      )}
      <Row
        title={"TRENDING NOW"}
        fetchUrl={requests.fetchTrending}
      />"

      <Row
        title={"NETFLIX ORIGINALS"}
        fetchUrl={requests.fetchTopRated}
      /><Row
        title={"ACTION MOVIES"}
        fetchUrl={requests.fetchActionMovies}
      /><Row
        title={"COMEDY MOVIES"}
        fetchUrl={requests.fetchComedyMovies}
      /><Row
        title={"HORROR MOVIES"}
        fetchUrl={requests.fetchHorrorMovies}
      /><Row
        title={"ROMCOM MOVIES"}
        fetchUrl={requests.fetchRomanceMovies}
      /><Row
        title={"DOCUMENTARIES"}
        fetchUrl={requests.fetchDocumentaries}
      />

    </div>
  );
}

export default App;
