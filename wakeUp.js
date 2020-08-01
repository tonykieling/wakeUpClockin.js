const axios = require("axios");
// const url = "https://jsonplaceholder.typicode.com/posts/1";
// const url = "http://example.com/movies.json";


const getData = async() => {
  const url = "https://clockinjs.herokuapp.com/ping";
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(` => ${new Date().toLocaleString('en-GB', {timeZone: "America/Vancouver"})} - received data: ${data}`);
  } catch (e) {
    console.log("error E01: ", e.message || e);
  }
};


const defineInterval = () => {
  const now = new Date();
  const timeInVancouver = new Date(now.toLocaleString('en-US', {timeZone: "America/Vancouver"}));
  return [timeInVancouver.getHours(), timeInVancouver.getMinutes()];
};


const wakeUpHeroku = () => {
  const getTime = defineInterval();
  console.log("getTime ==", getTime);
  // const interval = ((defineInterval()[0] >= 23) && (defineInterval()[1] >= 35)) ? 420 : 25;
  const interval = ((getTime[0] >= 23) && (getTime[1] >= 20)) ? 1 : 2;
  console.log("interval:::", interval)
  const oneMinute = 1000 * 60;
  const intervalInMinutes = interval * oneMinute;

  getData(); // it runs for the first time

  //it will run each 'intervalInMinutes'
  const myTimer = setTimeout(() => {
    // try{
      // getData();
    // } catch(e){
    //   console.log("error E02: ", e.message || e);
    // } finally{
      clearTimeout(myTimer);
      wakeUpHeroku();
    // }
  }, intervalInMinutes);
};

module.exports = wakeUpHeroku;
