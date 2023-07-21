//import './App.css'
import React from 'react'

import { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { NavBar } from "./components"
import { MoviesList, MoviesInsert, MoviesUpdate } from "./pages"

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [message, setMessage] = useState("")

  // Fetching message from backend
  useEffect(() => {
    fetch("https://mern-webapp-9f68.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <h1>{message}</h1>
  )
}

export default App
