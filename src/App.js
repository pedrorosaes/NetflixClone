import React,{useEffect, useState} from 'react';
import {MovieList} from './components/MovieRow/index'
import {FeaturedMovies} from './components/FeaturedMovie/index'
import {Tmdb} from './api/Tmdb'
import {Header} from './components/Header/index'
import {Footer} from './components/Footer/index'

import './App.css';

export function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData,setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=> { 
    const loadAll = async () => {
      //Buscando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //Buscando o FEATURED
      let originals = list.filter(i => i.slug === 'originals');
      let randomMovie = Math.floor(Math.random() * originals[0].items.results.length);
      let chosenMovie = originals[0].items.results[randomMovie];
      let chosenInfo = await Tmdb.getMoreInfo(chosenMovie.id, 'tv')
      setFeaturedData(chosenInfo)
    }
    loadAll();
  },[]);

  useEffect(() => {
    const scrollListner = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll',scrollListner);
    return ()=> {
      window.removeEventListener('scroll',scrollListner);
    }
  },[])


  return (
    <div className="Page">
      <Header black={blackHeader}/>
      {featuredData &&
        <FeaturedMovies item={featuredData}/>}
      <section className="lists">
        {movieList.map((item,key) => {
          return (
          <MovieList key={key} title={item.title} list={item.items}/>
          );})
          }
      </section>
      <Footer/>
      {movieList.length <= 0 && 
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading..."></img>
      </div>
      }
      
    </div>
  );
}


