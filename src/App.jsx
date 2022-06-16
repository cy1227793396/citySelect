import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="App">
     <Routes>
       <Route path='/' element={<Home/>}></Route>
     </Routes>
   </div>
   
  )
}

export default App