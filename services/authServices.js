import axios from "axios";
import Http from "./index";

const Cookie = require("js-cookie");

class AuthServices extends Http {
  constructor() {
    super();
  }
  login = (email, password) => {
    return this.instance.post("auth/login", { email, password });
  };
  register = (email, password) => {
    return this.instance.post("auth/login", { email, password });
  };
  getUserInfo = () => {
    return this.instance.get("auth/me");
  };
}

export default new AuthServices();
