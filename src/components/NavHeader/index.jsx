import React, { memo } from 'react'
import {NavBar} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
export default memo(function NavHeader({children}) {
  const navigate=useNavigate()
  return (
    <div>
      <NavBar onBack={()=>{navigate(-1)}}>{children}</NavBar>
    </div>
  )
})
