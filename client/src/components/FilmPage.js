import React from 'react';

import star from './assets/megastar.png';
import CarouselMain from './CaurouselMain';


 class FilmPage extends React.Component{
    constructor() {
        super();
        this.state = {video:"",dat:JSON.parse(sessionStorage.getItem("val"))};
    }
    async componentDidMount(){
     const response = await fetch(`https://api.themoviedb.org/3/movie/${this.state.dat.id}/videos?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=en-US`);
     const res = await response.json();
     this.setState({ video: res.results[0]?res.results[0].key:''});
     let val = JSON.parse(sessionStorage.getItem("val"));
     this.setState({dat: val});
     
    }

    render(){
       
        return(
            
            <div id = "fp" className=" container-fluid wrapperStyle">
               
               <div id = "upperBlock" className="wrapper">
                 <div className="row"></div>
                 <div className="row">

                     <h2 className="col">{this.state.dat.original_title}</h2>
                    
                     
                     <h4 className="col-auto">Average Vote: {this.state.dat.vote_average}
                     <img className = "star"src={star} ></img>
                     </h4>
                     
                     
                     <h4 className="col-auto">Votes: {this.state.dat.vote_count}</h4>
                
               </div>
               </div>
               <div id = "briefInfo" className="wrapper">
                   <h5>Release Date: {this.state.dat.release_date}</h5>
                   <div></div>
                </div>

               <div id = "photoVideo" className="row" style={{padding:'1% 5% 1% 5%', margin:'0%', border:'0%'}}>
                   
               <img  width="36%" height ="auto" src={`https://image.tmdb.org/t/p/original/${this.state.dat.poster_path}`} alt={this.state.dat.title} style={{ margin:'2%'}}/>
               {this.state.video?(
               <iframe  width="56%" height="auto" src={`https://www.youtube.com/embed/${this.state.video}`} style={{ margin:'2%'}}/>
               ):(
               <div style={{color:'white', margin:'0% 5% 5% 1%',maxWidth:'45%'}}>Sorry, there seems to be no video provided for this film. <hr/>The Universe wants you to watch it without spoilers, apparently.</div>
               )}
               </div>
               <div style={{  margin: "8px"}}>
               <h4 style={{  fontWeight: "bolder"}}>Overview:</h4>
              <h5 > {this.state.dat.overview}</h5></div>
             
               <div id = "videoCarousel" className="wrapper"></div>
               <div id = "photoCarousel" className="wrapper"></div>
               <div id = "cast"></div>
               <div className="head-text">
                Actors
               </div>
               <CarouselMain type={"actors"} filmId={this.state.dat.id} />
            </div>
        )
    }
}


export default FilmPage;