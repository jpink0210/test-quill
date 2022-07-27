// axios.js
import axios from "axios";

// Base config
const config = {
withCredentials: false,
responseType: "json"
// headers: { "Global-Header": "test" }
};

// Create instance
const $http = axios.create(config);
// const $http = axios;

export default $http;