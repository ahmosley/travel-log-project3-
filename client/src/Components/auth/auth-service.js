import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URI}`,
      withCredentials: true,
    });
    this.service = service;
  }
  signup = (username, password) => {
    console.log("in authservice signup: ", username, password);
    return this.service
      .post(
        "/routes/users/signup",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => response.data);
  };

  login = (username, password) => {
    console.log("in authservice login: ", username, password);
    return this.service
      .post(
        "/routes/users/login",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => response.data);
  };

  loggedin = () => {
    return this.service
      .get("/routes/users/loggedin")
      .then((response) => response.data);
  };
  logout = () => {
    return this.service
      .post("/routes/users/logout", {})
      .then((response) => response.data);
  };
}

export default AuthService;
