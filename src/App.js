import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.css";
import CustomModal from "./Components/CustomModal";
import Nav from "./Components/Nav/Nav";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import { modalState } from "./store/movie";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <div
          className="App"
          style={{ padding: "1rem 0", backgroundColor: "#111" }}
        >
          <main>
            <Route path="/" exact>
              <div style={{ padding: "5rem 0" }}>
                <Redirect to="/homescreen" />
              </div>
            </Route>
            <div style={{ backgroundColor: "#111" }}>
              <Route path="/homescreen" component={HomePage} exact />
              <Route path="/movie/:id" component={MovieDetails} exact />
            </div>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
