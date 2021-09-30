import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './MovieRow.css';

export function MovieList({title,list}) {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftClick = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x>0){
            x=0;
        }
        setScrollX(x);
    };
    const handleRightClick = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = list.results.length * 150;
        if ((window.innerWidth - listW)> x) {
            x = (window.innerWidth - listW) - 60;
        }

        setScrollX(x);
    }
    return(
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--left">
                <NavigateBeforeIcon style={{fontSize: 50}} onClick={handleLeftClick}/>
            </div>
            <div className="movieRow--right" onClick={handleRightClick}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft:scrollX, 
                    width:list.results.length * 150                
                    }}>
                {list.results.length > 0 && list.results.map((item,key)=>{
                    return (
                        <div className="movieRow--item" key={key}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={list.original_title}/>
                        </div>    
                );})}
                </div>
            </div>
        </div>
    );
}