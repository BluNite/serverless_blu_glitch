// import/require packages

//dotenv
require('dotenv').config();
// require express
const express = require('express');

//express rate limit package
const limiter = require('express-rate-limit')

// require body-parser
const bodyParser = require('body-parser')
// var for express()
const app = express();
// require cors
const cors = require('cors');

// whitlist for front-end calls 
// create reference to url address
const urlWhitelist = ['https://bluniteweatherapp.glitch.me'];
// cors options object
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || urlWhitelist.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new Error("Denied access by CORS"))
    }
  },
  optionSuccessStatus: 200
}
// PORT
const PORT = 3000;


//express middleware

// express json
app.use(express.json());
// body-parser
app.use(bodyParser.json());


//whitelist for incoming from front-end

// cors
app.use(cors(corsOptions));

// require weather module
const weather = require('./weather');



// test route
app.get("/", (req, res) => {
	res.json({ success: "hello world" })
});
//  middleware to weather module
app.use("/weather", weather)



const rateLimiter = limiter({
  windowMs: 1000,
  max: 1
})
// use rate limit
app.use(rateLimiter)
// set server to listen PORT
app.listen(PORT, () => {
	console.log(`app listening on: http://localhost:${PORT}`)
})