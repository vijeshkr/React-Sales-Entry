import axios from "axios";

// Creating an instance of axios
const makeRequest = axios.create({
    baseURL: 'http://5.189.180.8:8010',
});

export default makeRequest;