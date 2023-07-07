import axios from "axios";

const Cookie = require("js-cookie");

class Http {
  constructor() {
    const token = Cookie.get("token");
    this.instance = axios.create({
      baseURL: "http://localhost:4000/api",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response.status === 401) {
          Cookie.remove("token");
          window.location.href = "/login";
        }
        console.error(error.response);
        throw error?.response?.data || "Server error.";
      }
    );
  }
}

export default Http;
