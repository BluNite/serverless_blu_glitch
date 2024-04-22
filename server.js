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



// PORT
const PORT = 3000;


//express middleware

// express json
app.use(express.json());
// body-parser
app.use(bodyParser.json());
// cors
app.use(cors());

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