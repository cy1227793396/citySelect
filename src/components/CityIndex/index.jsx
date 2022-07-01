import React from 'react'
import './index.css'
export default function CityIndex({activeIndex,indexList,scrollToRow}) {
  // console.log(indexList);
  console.log(activeIndex);
  const indexClick=(e)=>{
    scrollToRow(e.target.innerText)
  }
  return (
  <>
  <ul className='city-index'>
  {
    indexList.map((item,index)=>{
      return(
        <li className='city-index-item' key={index} onClick={(e)=>indexClick(e)}>
          <span className={activeIndex===item?'index-active':''}>{item}</span>
        </li>
        )
    })
  }
  </ul>
  </>
  )
}
