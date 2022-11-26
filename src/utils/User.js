import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createPin = (body, id, token) => {
  const pin = { pin: body };
  axios.patch(`${baseUrl}/pin/${id}`, pin, config(token));
};
