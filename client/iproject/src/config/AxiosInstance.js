import axios from "axios";
const instance = axios.create({
  // baseURL:import.meta.env.VITE_PORT_AWS,
  baseURL: import.meta.env.VITE_PORT,
});

export default instance;
