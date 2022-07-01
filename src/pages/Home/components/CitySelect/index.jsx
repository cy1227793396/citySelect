import React, { memo } from 'react'
import {Wrapper} from './style'
import {Link, useSearchParams} from 'react-router-dom'
export default memo(function CitySelect({cityName=''}) {
  // const [search]=useSearchParams()
  // const cityName=search.get('name')||''
  return (
    <Wrapper>
        <Link 
        className='citygps'
        to='/cities'
        >
            <i className='fa fa-map-marker'></i>
            <span>{cityName?cityName:'城市定位'}</span>
            <div className="header-search">
                <input type="text" placeholder='搜索'/>
            </div>
        </Link>
    </Wrapper>
  )
})
