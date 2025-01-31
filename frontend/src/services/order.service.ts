import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5002/api/orders";

export const getOrders = () => {
  return axios.get(API_URL, { headers: authHeader() });
};
