import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;
const baseUrls = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createPin = (body, id, token) => {
  const pin = { pin: body };
  return axios.patch(`${baseUrl}/pin/${id}`, pin, config(token));
};

export const getDataById = (token, id) => {
  return axios.get(`${baseUrl}/profile/${id}`, config(token));
};

export const getDashboard = (token, id) => {
  return axios.get(`${baseUrls}/dashboard/${id}`, config(token));
};

export const searchUser = (params, token) => {
  return axios.get(`${baseUrl}?${params}`, config(token));
};
