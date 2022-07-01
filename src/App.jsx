import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'


import CityList from './pages/CityList'
function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="App">
   
     <Routes>
       <Route path='/home' element={<Home/>}></Route>
       <Route path='/cities' element={<CityList/>}></Route>
     </Routes>
    
   </div>
   
  )
}

export default App
