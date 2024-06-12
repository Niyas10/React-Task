import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DeatilePage from './pages/DeatilePage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/users" element={<DeatilePage/>}/>
      </Routes>
    </Router>
  )
}

export default App