import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import HomePage from "./pages/HomePage";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import MyList from "./pages/MyList/MyList";
import SearchPage from "./pages/SearchPage/SearchPage";
import { userInfoState } from "./store/login";
import { getUserById } from "./actions/userActions.js";
function App() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    async function getData() {
      if (localStorage.getItem("userId") && localStorage.getItem("userToken")) {
        const res = await getUserById(localStorage.getItem("userId"));
        setUserInfo({
          ...userInfo,
          userId: res?._id,
          isAuthenticated: true,
          name: res?.name,
          email: res?.email,
        });
      } else {
        setUserInfo({
          token: null,
          userId: null,
          isAuthenticated: false,
          name: null,
          email: null,
        });
      }
    }
    getData();
    // eslint-disable-next-line
  }, []);

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
            {/* <div style={{ backgroundColor: "#111" }}> */}
            <Route path="/searchPage" component={SearchPage} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/homescreen" component={HomePage} exact />
            <Route path="/movie/:id" component={MovieDetails} exact />
            <Route path="/mylist" component={MyList} exact />
            {/* </div> */}
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
