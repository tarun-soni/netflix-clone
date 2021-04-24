import Axios from "axios";
const localURL = `http://localhost:5000`;
const remoteURL = `https://movieflix-clone-backend.herokuapp.com`;

const USING_URL =
  process.env.REACT_APP_ENV === "production" ? remoteURL : localURL;
export const logoutUser = async () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userId");
};
export const loginUser = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await Axios.post(
      `${USING_URL}/api/users/login`,
      { email, password },
      config
    );
    if (data) return data;
    else return null;
  } catch (err) {
    // console.log("err in login :>> ", err);
    console.log("err msg in login:>> ", err.message);
  }
};

export const getUserById = async (id) => {
  const token = localStorage.getItem("userToken");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.get(`${USING_URL}/api/users/${id}`, config);
    // console.log("response :>> ", response);
    if (response.data) return response.data;
    else return "error";
  } catch (err) {
    console.log("err in getUserById :>> ", err);
    // console.log("err msg in getUserById :>> ", err.message);
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await Axios.post(
      `${USING_URL}/api/users`,
      { name, email, password },
      config
    );

    if (data) return data;
    else return null;
  } catch (err) {
    console.log("err :>> ", err);
  }
};
