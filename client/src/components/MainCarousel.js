import React from 'react';
import Carousel from "react-multi-carousel";
import star from './assets/star.png'
import play from './assets/play.png'
import info from './assets/info-grey.png';
import 'react-multi-carousel/lib/styles.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

export class MainCarousel extends React.Component {
    constructor() {
        super();
        this.state = {data: [], dataMain: [], value: "", showHide: false, currFilmInfo: {}, showAlert: false};
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.handleModalShowHide2 = this.handleModalShowHide2.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=en-US&page=1');
        const json = await response.json();
        this.setState({ data: json});
      
        sessionStorage.setItem('fullInf',JSON.stringify(json.results))
    }


    handleModalShowHide(film, isneedAlert) {
        this.setState({ showHide: !this.state.showHide });
        this.setState({ showAlert: isneedAlert });
        this.setState({ currFilmInfo: film });
    }

    handleModalShowHide2() {
        this.setState({ showHide: !this.state.showHide });
    }

    render() {
        let mod = '';
        if (this.state.data.results) {
            return (
                <div>
               

                <div className="head-text">
                    What to watch
                </div>
                {mod}
                <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding"
                centerMode={false}
                slidesToSlide={3}
            >
            
            {this.state.data.results.map(el => (
                
                <div element={el.id} key ={el.id}>
                
           
           
                    <div className="films-list-img App-link" >
                    
                    <Link style={{ textDecoration: 'none', color: 'white' }} to= "/FilmPage" > 
                        <img className="poster-img" onClick={()=>this.interestedCount(el.original_title)} onMouseOver={()=> {sessionStorage.removeItem("val");sessionStorage.setItem("val",JSON.stringify(el))}}  src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt={el.title}/>
                    </Link>    
                        
                        <div className="bottom-content-wrapper">
                            <div className="rating">
                                <div className="vote">
       
                                  <img className = "star" src={star} alt="star icon" />
                                    <div className="vote_average">{el.vote_average}</div>
                                </div>
                                <div className="like-film">Like this film</div>
                            </div>
                           <Link style={{ textDecoration: 'none', color: 'white' }} to= "/FilmPage">
                                <div className="film-title" onClick={()=>this.interestedCount(el.original_title)} onMouseOver={()=>{ sessionStorage.removeItem("val");sessionStorage.setItem("val",JSON.stringify(el))}}>{el.title}</div>
                            </Link> 
                            
                            <button type="button" className="add-to-watchlist-btn" onClick = {() => {this.handleModalShowHide(el, true); this.props.watchListincrement(el.id); }}>+ Watchlist</button>
                            <div className="additional-info">
                                <Link to= {{pathname:'/Trailer',testinfo:'test'}}> 
                                    <div className="trailer">                                
                                        <img src={play} alt="play button" className="play-button"/>  Trailer
                                    </div>
                                </Link>
                                <div className="info-button-wrapper">
                                    <img src={info} alt="info button" className="info-button" onClick = {() => this.handleModalShowHide(el, false)}/> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))};
                
            </Carousel>
            <div className="head-text">
                Popular people
            </div>
            
            </div>
            );
        } else {
            return (
                <div>Wait...</div>
            );
        }
    
    }
}

