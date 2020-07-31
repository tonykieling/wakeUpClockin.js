const axios = require("axios");
// const url = "https://jsonplaceholder.typicode.com/posts/1";
// const url = "http://example.com/movies.json";

const getData = async() => {
  const url = "https://clockinjs.herokuapp.com/ping";
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log("received data: ", data);
  } catch (e) {
    console.log("error E01: ", e.message || e);
  }
};


const wakeUpHeroku = () => {
  const oneMinute = 1000 * 60;
  const intervalInMinutes = 25 * oneMinute;

  getData(); // it runs for the first time

  //it will run each 'intervalInMinutes'
  setTimeout(() => {
    try{
      getData();  
    } catch(e){
      console.log("error E02: ", e.message || e);
    } finally{
      wakeUpHeroku();
    }
  }, intervalInMinutes);
};


module.exports = wakeUpHeroku;
