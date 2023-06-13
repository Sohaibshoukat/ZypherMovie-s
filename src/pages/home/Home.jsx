import HeroBanner from "./heroBanner/HeroBanner"
import "./style.scss"
import React from 'react'
import Trending from "./trending/Trending"
import Popular from "./popular/Popular"
import TopRated from "./topRated/TopRated"

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
   </div>
  )
}

export default Home