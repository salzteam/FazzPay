import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history`;
const baseUrlT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/transfer`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const HistoryLimit = (params, token) => {
  return axios.get(`${baseUrl}?${params}`, config(token));
};

export const CreateTransfer = (body, token) => {
  return axios.post(`${baseUrlT}`, body, config(token));
};
