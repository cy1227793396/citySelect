//城市列表
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavHeader from '../../components/NavHeader'
import VirtualList from '../../components/VirtualList'
import './index.css'

export default function CityList() {
 
    const [citylist,setCitylist]=useState([])
    useEffect(()=>{
     (async()=>{
        const cityRes=await axios.get('https://www.fastmock.site/mock/05aa00612c20da15ea9e70bf54b34316/citylsit/citydata')
        // console.log(cityRes);
        setCitylist(cityRes.data.city_list)
     })()
    },[])
  
  return (
    <div className='citylist'>
        <div className="navbar">
            <NavHeader>城市选择</NavHeader>
        </div>
      {citylist.length!=0&&<VirtualList datalist={citylist}/> }
    </div>
  )
}
