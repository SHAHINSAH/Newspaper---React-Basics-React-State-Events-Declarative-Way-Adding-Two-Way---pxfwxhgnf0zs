import React, { Component, useState, useEffect } from "react";
import '../styles/App.css';

const App = () => {
  const [weather, setWeather] = useState(JSON.stringify({}))
  const [news, setNews] = useState(JSON.stringify({ title: "", description: "" }))
  const [lat, setlati] = useState("")
  const [long, setlongi] = useState("")
  const [newlocation, setnewlocatio] = useState("")

  useEffect(() => {                                    
    if (lat !== "" && long !== "")
    // also runs if one of lat or long is updated
    {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${'4a4f1ce1953c34c9ba2088f874784df5'}`, { method: "GET" }).then(e => e.json()).then(e => {
        setWeather(JSON.stringify({ temperature: e.main.temp, location: e.coord }))
      })                                                    
      fetch(`https://gnews.io/api/v4/search?q=example&token=a4bae192d02391945551737e4af056f5&max=5`).then(e => e.json()).then(e => {
        // for(int )  
        setNews(JSON.stringify({ key: "1", title: e.articles[0].title, description: e.articles[0].description }))
      })
    }

  }, [lat, long])

  const findFromCity = (e) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${'4a4f1ce1953c34c9ba2088f874784df5'}`, { method: "GET" }).then(e => e.json()).then(e => {
      setWeather(JSON.stringify({ key: "2", temperature: e.main.temp, location: e.coord }))
    }).catch(e => {
      setWeather(JSON.stringify({ key: "3", message: "invalid location" }))
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      console.log("Got the Location", e);
      setlati(e.coords.latitude)

      setlongi(e.coords.longitude)
    }, (e) => console.log('facing issue in getting the coordinates', e), {});
  }, [])

  const inputHandler = (e) => {
    if (e.key === "Enter") {
      findFromCity(document.getElementsByTagName('input')[0].value)
    }
  }

  return (
    <>
      <input onKeyDown={inputHandler} />
      {weather}
      {news}
    </>)
}


export default App;