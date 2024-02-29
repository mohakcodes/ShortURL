import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

import {Route,Routes} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App