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
      `${remoteURL}/api/movie`,
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
