import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoad/LazyLoad";
import PosterFallback from "../../assets/PosterFallback.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading,endPoint,title }) => {
  const carouselContainer = useRef(null);
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const Navigation = (dir) => {
      const container = carouselContainer.current;

      const scrollAmount =
      dir === "left"
      ? container.scrollLeft - (container.offsetWidth + 20)
      : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
  };

  const SkItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock skeleton">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && (
          <div className="carouselTitle">
            {title}
          </div>
        )}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => Navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => Navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const Img_url = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div className="carouselItem" key={item.id}
                onClick={()=>{navigate(`/${item?.media_type || endPoint}/${item.id}`)}}>
                  <div className="posterBlock">
                    <Img src={Img_url} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids} />
                  </div>
                  <div className="textBlock">
                    <div className="title">{item.title || item.name}</div>

                    <div className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {SkItem()}
            {SkItem()}
            {SkItem()}
            {SkItem()}
            {SkItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
