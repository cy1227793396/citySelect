import React, { memo } from 'react'
import './index.css'
import {Link, useSearchParams} from 'react-router-dom'
export default memo(function CitySelect({cityName=''}) {
  // const [search]=useSearchParams()
  // const cityName=search.get('name')||''
  return (
      <div className="select">
        <Link 
        to='/cities'
        style={{height:"100%",width:"100%",}}
        >
           
            <span >{cityName?cityName:'城市定位'}</span>
            
        </Link>
        </div>
  )
})
