const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get("/", (req, res) => {
  res.json({ success: "hello weather route!! " });
})

router.get("/coords", (req, res) => {
	res.json({ success: "hello weather coords route!! " })
  console.log('coords route')
})

// async await for fetching weather data-
const fetchApi = async (cityText) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=${process.env.WEATHER_API_KEY}`
	try {
		const weatherData = await fetch(url);
		const weatherJson = await weatherData.json();

     return weatherJson;
    
  } catch (err) {
		return { Error: err.stack }
	}
};


//req params for api city text

router.get("/:cityText", async (req, res) => {
	const cityText = req.params.cityText;
	const data = await fetchApi(cityText);
	res.json(data);
  
});

// post route city
router.post("/", async (req, res) => {
	const cityText = req.body.cityText;
	const data = await fetchApi(cityText);
	res.json(data)
})

// req params for lat lon
router.get("/coords/:lat/:lon", async (req, res) => {
  console.log(req.params)
  const {lat, lon} = req.params;
 
const apiLatLon = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

await fetch(apiLatLon)
  .then(response => response.json())
  .then(data => {
  console.log(data)
  res.json(data)
    
  })
  .catch(error => console.log(error));
 
  
  
  })


// post route coords

router.post("/coords", async (req, res) => {
  
  const {lat, lon} = req.body;
 
const apiLatLon = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

await fetch(apiLatLon)
  .then(response => response.json())
  .then(data => {
  console.log(data)
  res.json(data)
    
  })
  .catch(error => console.log(error));
 
  
  
  })

module.exports = router