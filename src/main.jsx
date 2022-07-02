import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter} from 'react-router-dom'
import './index.css'
import './assests/styles/reset.css'


ReactDOM.createRoot(document.getElementById('root')).render(

    <HashRouter>
    <App />
    </HashRouter>

)
