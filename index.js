const express = require("express");
const wakeUp  = require("./wakeUp.js");

const PORT    = 3456;
const app     = express();

app.listen(PORT, () => {
  console.log("The service wakeUpHeroku is getting started.");
  wakeUp();
});