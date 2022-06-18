import axios from 'axios';

const API_URL = "http://localhost:9094/auth/auth/v1/api/user/";   //"http://localhost:8081/";

class LoginService {

  login(employee) {
    return axios.post(API_URL + 'login', JSON.stringify(employee),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } });
  }

}

export default new LoginService();
