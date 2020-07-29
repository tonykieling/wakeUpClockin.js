const axios = require("axios");
// const url = "https://jsonplaceholder.typicode.com/posts/1";
const url = "https://clockinjs.herokuapp.com/ping";
// const url = "http://example.com/movies.json";

const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getData(url);