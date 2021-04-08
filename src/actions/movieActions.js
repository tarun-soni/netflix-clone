import Axios from "axios";
const localURL = `http://localhost:5000`;
const remoteURL = `https://movieflix-clone-backend.herokuapp.com`;

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
      `${localURL}/api/movie`,
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
    const res = await Axios.get(`${localURL}/api/movie/user/${userid}`, config);

    if (res.status === 200) return res.data;
    else return "Error in getMovies";
  } catch (error) {
    console.log(`error in add movie`, error);
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
      `${localURL}/api/movie/${movie_id}`,
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
