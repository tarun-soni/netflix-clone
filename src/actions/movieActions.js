import Axios from "axios";
const localURL = `http://localhost:5000`;
const remoteURL = `https://movieflix-clone-backend.herokuapp.com`;

const USING_URL =
  process.env.REACT_APP_ENV === "production" ? remoteURL : localURL;
export const addMovie = async (dataFromUser) => {
  const token = localStorage.getItem("userToken");
  console.log("dataFromUser :>> ", dataFromUser);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await Axios.post(
      `${USING_URL}/api/movie`,
      dataFromUser,
      config
    );
    console.log("response :>> ", response);
    if (response?.status === 201) {
      return "success";
    } else return "failed";
  } catch (error) {
    console.log(`error in add movie`, error);
  }
};

export const getUserMovies = async (userid) => {
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await Axios.get(
      `${USING_URL}/api/movie/user/${userid}`,
      config
    );

    if (res.status === 200) return res.data;
    else if (res.status === 401) return "loginAgain";
    else return "Error in getMovies";
  } catch (error) {
    //   console.log(`error in get user movies`, error);
    console.log(`error msg in get user movies`, error.message);
  }
};
export const removeMovie = async (movie_id) => {
  const token = localStorage.getItem("userToken");
  console.log(`movie_id`, typeof movie_id);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await Axios.delete(
      `${USING_URL}/api/movie/${movie_id}`,
      config
    );
    console.log("response :>> ", response);
    if (response?.status === 200) {
      return "success";
    } else return "failed";
  } catch (error) {
    console.log(`error in add movie`, error);
  }
};
