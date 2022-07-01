import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CityIndex from '../CityIndex'
import './index.css'

const indexToTop = {}
let viewList = []

const VirtualList = ({datalist}) => {

   const [ dataList,setDataList ] = useState([])  /* 保存数据源 */
   const [ position , setPosition ] = useState([0,0]) /* 截取缓冲区 + 视图区索引 */
   const [startIndex,setStartIndex]=useState('A')
   const box = useRef(null)     /* 获取元素用于容器高度 */
   const context = useRef(null) /* 用于移动视图区域，形成滑动效果。 */
   // 之所以用ref是因为这些值不经常变化
   const scrollInfo = useRef({ 
       height:window.innerHeight-95,     /* 容器高度 */
       bufferCount:8,  /* 缓冲区个数 */
       itemHeight:60,  /* 每一个item高度 */
       limit:0,  /* 渲染区个数 */ 
    }) 

    // console.log(window.innerHeight);
    useEffect(()=>{
        const height = box.current.offsetHeight // 视口高度
        const { itemHeight , bufferCount } = scrollInfo.current
        const limit =  Math.ceil(height / itemHeight) + bufferCount
        scrollInfo.current = { limit,height,bufferCount,itemHeight }
        // const dataList = new Array(1000).fill(1).map((item,index)=> index + 1 )
        setDataList(handleCitydata(datalist))
        setPosition([0,limit])
    },[])
 
    // 城市列表数据源
   let preKey = ''
   const handleCitydata = data => {
       const arr = []
       for(let key in data){
           arr.push(key)
           arr.push(...data[key])
           if(key === 'A'){
               indexToTop[key] = 0
           }
           else {
               indexToTop[key] = indexToTop[preKey]+data[preKey].length*scrollInfo.current.itemHeight+60
           }
           preKey = key
           console.log(data[key].length);
       }
       console.log(indexToTop);
       return arr
   }
   //右侧字母列表数据源
   const handleCityIndex=data=>{
       const res=[]
       for(let key in data){
           res.push(key)
       }
       return res
   }
   const handleScroll = () => {
       const { scrollTop } = box.current
       const { itemHeight , limit } = scrollInfo.current
       // 因为直接使用scrollTop的话，就每触发一次scroll事件就会改变下偏移量，造成滑动与偏移同时产生，
       // 所以就不会这么丝滑了。取余操作的话，表示每经过一个元素块变动一次，不会频繁的触发偏移操作
       const currentOffset = scrollTop - (scrollTop % itemHeight) 
       const start = Math.floor(scrollTop / itemHeight)
       // 1.当滚动没有经过一个元素高度时，currentOffset值前后是相等的
       // 所以相当于不偏移，此时只有滚动效果
       // 2.添加偏移是因为scroll_box盒子很高，滚轮滚动时，页面上移，此时context盒子也需要
       // 跟着滚动，不然就看不到context盒子了，相比于之前每个元素都滚动性能更好
       context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)` /* 偏移，造成下滑效果 */
       const end = Math.floor(scrollTop / itemHeight + limit + 1)
       if(end !== position[1] || start !== position[0]  ){ /* 如果render内容发生改变，那么截取  */
            setPosition([ start , end ])
            viewList = dataList.slice(start, end - scrollInfo.current.bufferCount)
       }
       finaStartindex()
   } 
    //拿到当前可视区第一个字母索引 传给右侧列表 让对应字母高亮
   const handleStartIndex=(list)=>{

    return  list.find(item=>!(item instanceof Object))
   }
   const finaStartindex=()=>{
       let res=handleStartIndex(viewList)
       if(res!=undefined&&res!=startIndex){
        setStartIndex(res)
       }
   }
   
   //处理点击字母跳到相应位置
   const scrollToRow=(title)=>{
    // const isToTop = box.current.scrollTop > indexToTop[title] ? true : false
    // let step = parseInt((indexToTop[title] - box.current.scrollTop) / 8)
    // let timer = setInterval(() => {
    //     box.current.scrollTop += step
    //     if(isToTop){
    //         console.log(box.current.scrollTop);
    //         if(box.current.scrollTop+step <= indexToTop[title]){
    //             clearInterval(timer)
    //         }
    //     }
    //     else{
    //         if(box.current.scrollTop+step >= indexToTop[title]){
    //             clearInterval(timer)
    //         }
    //     }
    // }, 10);
    box.current.scrollTop=indexToTop[title]
    setStartIndex(title)
    console.log(box.current.scrollTop);
   }


   const { itemHeight , height } = scrollInfo.current
   const [ start ,end ] = position
   const renderList = dataList.slice(start,end) /* 渲染区间 */
   
//    console.log('渲染区间',context)
//    console.log(dataList);
    return <>
    <CityIndex activeIndex={startIndex} indexList={handleCityIndex(datalist)} scrollToRow={scrollToRow}/>
    <div className="list_box" ref={box} onScroll={ handleScroll } style={{height: height+'px', overflowY: 'scroll'}}>
     <div className="scroll_box" style={{ height: `${dataList.length * itemHeight}px`}} >
        <div className="context" ref={context}> 
        
            {
               renderList.map((item)=> {

                   return (
                       <div className="list">
                    {item instanceof Object ? 
                   <Link className="name"   to={{ pathname:'/home',
                   search:`name=${item.city}`}}  
                   key={item instanceof Object ? item.code : item}>{item.city}</Link>
                   :<div className="title">{item}</div> 
                   }
                   </div>
                   )
                   })
            }  
            
        </div>
     </div>
   </div>
   </>
}

export default VirtualList