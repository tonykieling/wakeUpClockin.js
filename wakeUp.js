const axios = require("axios");

const getData = async() => {
  const url = "https://clockinjs.herokuapp.com/ping";
  try {
    console.log(`###Going to send a ping at ${new Date().toLocaleString('en-GB', {timeZone: "America/Vancouver"})}`);
    const response = await axios.get(url);
    const data = response.data;
    console.log(` => ${new Date().toLocaleString('en-GB', {timeZone: "America/Vancouver"})} - received data: ${data}\n`);
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

  //it will change the interval after 23:34 to 420 minutes (7 hours)
  const interval = ((defineInterval()[0] >= 23) && (defineInterval()[1] >= 35)) ? 420 : 25;

  const oneMinute = 1000 * 60;
  const intervalInMinutes = interval * oneMinute;

  getData(); // it calls the function to reach the server

  //it will run each 'intervalInMinutes'
  const myTimer = setTimeout(() => {
    clearTimeout(myTimer);
    wakeUpHeroku();
  }, intervalInMinutes);
};

module.exports = wakeUpHeroku;
