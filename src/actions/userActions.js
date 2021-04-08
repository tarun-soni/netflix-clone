import Axios from "axios";
const localURL = `http://localhost:5000`;
const remoteURL = `https://movieflix-clone-backend.herokuapp.com`;

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
      `${localURL}/api/users/login`,
      { email, password },
      config
    );
    console.log("data :>> ", data);
    if (data) return data;
    else return null;
  } catch (err) {
    console.log("err :>> ", err);
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
    const { data } = await Axios.get(`${localURL}/api/users/${id}`, config);

    if (data) return data;
    else return null;
  } catch (err) {
    console.log("err :>> ", err);
  }
};
