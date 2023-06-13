import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/SwitchTab/SwitchTab'
import useFetch from "../../../hooks/useFetch"
import Carousel from '../../../components/carousel/Carousel'

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie")

  const {data,loading} = useFetch(`/${endPoint}/popular`)  

  const onTabChange=(tab)=>{
    setEndPoint(tab==="Movie"?"movie":"tv")
  }
  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">
                Popular
            </span>
            <SwitchTab data={["Movie", "Tv Show"]}  onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel endPoint={endPoint} data={data?.results} loading={loading}/>
    </div>
  )
}

export default Popular