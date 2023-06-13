import { useParams } from "react-router-dom"
import "./style.scss"
import React from 'react'
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./VideoSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const DetailPage = () => {
  const {mediaType,id} =useParams();
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits,loading:creditsloading}=useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsloading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default DetailPage