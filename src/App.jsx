
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
function App() {
  return (
   <div className="App">
     <Routes>
       <Route path='/' element={<Navigate to='/home'/> }></Route>
       <Route path='/home' element={<Home/>}></Route>
       <Route path='/cities' element={<CityList/>}></Route>
     </Routes>
   </div>
   
  )
}

export default App
