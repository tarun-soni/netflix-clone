import Axios from "axios";

export const addMovie = async (dataFromUser) => {
  const token = localStorage.getItem("userToken");
  console.log("dataFromUser :>> ", dataFromUser);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmRjZmI3ZjZjZmRjMjllMGMzNzU4NSIsImlhdCI6MTYxNzgxMTY2NSwiZXhwIjoxNjIwNDAzNjY1fQ.IcErSTO22nQhpF3ZsBFUvnhuuK5uYWWyN961Mt6QMMs`,
    },
  };
  try {
    const response = await Axios.post(
      `http://localhost:5000/api/movie`,
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
