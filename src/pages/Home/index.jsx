import React, { memo } from 'react'
import { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CitySelect from './components/CitySelect'

export default memo(function Home() {
  const [search]=useSearchParams()
  const cityName=search.get('name')||''
  
  return (
    <div>
      <CitySelect cityName={cityName}/>
    </div>
  )
})






