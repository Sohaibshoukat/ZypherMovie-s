import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FetchFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration ,getgenres} from "./Stores/HomeSlice";


import Header from "./components/header/Header"
import Footer from "./components/footer/footer"
import Home from "./pages/home/Home";
import SearchResult from "./pages/Search/SearchResult";
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"
import DetailPage from "./pages/detailPage/DetailPage";


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    FetchApiConfig();
    genresCall();
  }, []);

  const FetchApiConfig = () => {
    FetchFromApi("/configuration")
      .then((res) => {
        const url={
          backdrop: res.images.secure_base_url+"original",
          poster: res.images.secure_base_url+"original",
          profile: res.images.secure_base_url+"original"
        }
        dispatch(getApiConfiguration(url));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const genresCall =async ()=>{
    let promises = [];
    let endPoints=["tv","movie"];
    let allgenres={};

    endPoints.forEach((url)=>{
      promises.push(FetchFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);

    data.map(({genres})=>{
      return genres.map((item)=>{allgenres[item.id]=item})
    })

    dispatch(getgenres(allgenres))
  }

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/:mediaType/:id" element={<DetailPage/>} />
          <Route exact path="/search/:query" element={<SearchResult/>} />
          <Route exact path="/explore/:mediaType" element={<Explore/>} />
          <Route exact path="*" element={<PageNotFound/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
