import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import "./global.css"
import s from "./style.module.css";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    try{
    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[0]);
    }
    }catch(error){
      alert("Oups,erreur " + error.message )
    }
  }

  async function fetchRecommendations(tvShowId) {
    try{
    const recommendations = await TVShowAPI.fetchRecommendations(
      tvShowId
    );
    if (recommendations.length > 0) {
      setRecommendationList(recommendations.slice(0, 10));
    }
  }catch(error){
    alert("Oups,erreur " + error.message )
  }
  }



  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  async function SearchTVShow(tvShowName) {
    try{
    const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
        setCurrentTVShow(searchResponse[0]);
    }catch(error){
      alert("Oups,erreur " + error.message )
    }
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="Watowatch"
              subtitle="Find a show you may like"
            />
          </div>
          <div className="col-md-12 col-lg-4">
           <SearchBar onSubmit={SearchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList onClickItem = {updateCurrentTVShow} tvShowList={recommendationList} />
        )}
      </div>
    </div>
  );
}