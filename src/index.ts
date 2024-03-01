/* --------------------------------- */
// mockup management system

import express from "express";
import cors from "cors";
import axios from "axios";
const bodyParser = require('body-parser');

const port = 4000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

/* --------------------------------- */
// Data in memory
let Datalist = {
  departure: [
    {
      code: "001",  // ID 
      time: "12:00:00",  // dearture time 
      point: "destination A", // destination description
      location: "gate A",  // gate, platform
      status: "on-time" // on-time, delayed, cancelled, departed, boarding
    },
    {
      code: "002",  // ID 
      time: "12:00:05",  // dearture time 
      point: "destination B", // destination description
      location: "gate D",  // gate, platform
      status: "on-time" // on-time, delayed, cancelled, departed, boarding
    },
    {
      code: "003",  // ID 
      time: "12:00:10",  // dearture time 
      point: "destination C", // destination description
      location: "gate B",  // gate, platform
      status: "delayed" // on-time, delayed, cancelled, departed, boarding
    },
    {
      code: "004",  // ID 
      time: "12:00:12",  // dearture time 
      point: "destination D", // destination description
      location: "gate A",  // gate, platform
      status: "cancelled" // on-time, delayed, cancelled, departed, boarding
    },
    {
      code: "005",  // ID 
      time: "12:00:15",  // dearture time 
      point: "destination E", // destination description
      location: "gate C",  // gate, platform
      status: "boarding" // on-time, delayed, cancelled, departed, boarding
    },
    {
      code: "006",  // ID 
      time: "12:00:20",  // dearture time 
      point: "destination F", // destination description
      location: "gate D",  // gate, platform
      status: "delayed" // on-time, delayed, cancelled, departed, boarding
    },
  ],
  arrival: [
    {
      code: "106",  // ID 
      time: "12:15:00",  // arrival time 
      point: "origin A", // origin description
      location: "gate A",  // gate, platform
      status: "on-time" // on-time, delayed, cancelled, arrived
    },
    {
      code: "107",  // ID 
      time: "12:20:00",  // arrival time 
      point: "origin B", // origin description
      location: "gate C",  // gate, platform
      status: "on-time" // on-time, delayed, cancelled, arrived
    },
    {
      code: "107",  // ID 
      time: "12:22:00",  // arrival time 
      point: "origin C", // origin description
      location: "gate B",  // gate, platform
      status: "delayed" // on-time, delayed, cancelled, arrived
    },
    {
      code: "108",  // ID 
      time: "12:22:00",  // arrival time 
      point: "origin D", // origin description
      location: "gate E",  // gate, platform
      status: "cancelled" // on-time, delayed, cancelled, arrived
    },
    {
      code: "109",  // ID 
      time: "12:10:00",  // arrival time 
      point: "origin F", // origin description
      location: "gate F",  // gate, platform
      status: "on.time" // on-time, delayed, cancelled, arrived
    },
  ]
}

/* --------------------------------- */

function getSystemDateAndTime(): { systemDate: string; systemTime: string } {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const formatedDate = `${year}/${month}/${day}`;
  const horaFormateada = `${hours}:${minutes}:${seconds}`;
  return { systemDate: formatedDate, systemTime: horaFormateada };
}

/* --------------------------------- */

app.get("/departures-arrivals", (req, res) => {
  const {systemDate, systemTime} = getSystemDateAndTime();
  console.log("-------------------------------------------------------------------");
  console.log(`SM GET list departures-arrivals -  Date: ${systemDate} Time: ${systemTime}`);
  console.log("GET return (Datalist:",Datalist, ")");
  res.send(Datalist);
  } 
);

/* --------------------------------- */

app.post("/notification", async (req, res) => {
  try {
    const {systemDate, systemTime} = getSystemDateAndTime();
    console.log("-------------------------------------------------------------------");
    console.log(`POST notification -  Date: ${systemDate} Time: ${systemTime}`);
    console.log(`Data: ${req.body}`);
    const result = await axios.post(
      "http://127.0.0.1:5000/notification",
      req.body
    );
    console.log("Result: (", result.status, result.data, ")");
    res.send(result.data);
  } catch (e) {
    if (e instanceof axios.AxiosError) {
      console.log("CODE :", e.code); 
      console.log("DATA:", e.response?.data);
    } else {
      console.log("EXCEPTION e:", e);
    }
  }
});


/* --------------------------------- */

app.listen(port, () => {
  console.log(`SM listening on port ${port}`);
});
