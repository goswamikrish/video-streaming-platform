import axios from "axios";

const PROXY_URL = '/api/youtube';

export const fetchAPI = async (url) => {
  const { data } = await axios.get(`${PROXY_URL}/${url}`);
  return data;
}