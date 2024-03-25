import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_EP as string,
  headers: {
    "api-key": import.meta.env.VITE_API_KEY_BE as string,
  },
});

export default instance;
