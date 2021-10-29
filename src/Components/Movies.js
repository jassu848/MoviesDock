import React, { Component } from 'react'
// import {movies} from './GetMovies'
import axios from 'axios'
export default class Movies extends Component {

    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    async componentDidMount(){
        const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`)
        const data=res.data
        this.setState({
            movies:[...data.results]
        })
        
    }
    changeMovies=async()=>{
        console.log("change movies");
        console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight=()=>{
        let temparr =[]
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i);
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies)
    }
    handleLeft=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleClick=(value)=>{
        if(value!=this.state.currPage){
            console.log("i am called")
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }
    handleFavourites=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
    }
    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
    render() {
        // let movie=movies.results
        return (
           <>
           {
               this.state.movies.length==0?
               <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
            </div>:
            <div>
                <h1 className="text-center">Trending</h1>
            <div  className="movies-list">
                {
                    this.state.movies.map((movieobj)=>(
                        <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieobj.id})} onMouseLeave={()=>this.setState({hover:''})} >
                        <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}  alt={movieobj.title} class="card-img-top movie-img"/>
                        {/* <div className="card-body"> */}
                          <h4 className="card-title movie-title">{movieobj.title}</h4>
                          {/* <p className="card-text movie-text">{movieobj.overview}</p> */}
                          <div className="Button-wrapper " style={{display:'flex',width:'100%',justifyContent:'center'}}>
                              {
                                this.state.hover==movieobj.id &&
                                <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieobj)}>{this.state.favourites.includes(movieobj.id)?"Remove from favourites":"Add to favourites"}</a>
                              }
                          
                        </div>
                      </div>
                    ))
                }
            </div> 
            <div style={{display:'flex',justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                      
                    <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                        {
                            this.state.parr.map((value)=>(
                                (this.state.currPage==value)?<li class="page-item"><a class="page-link" style={{backgroundColor:'#DCA166'} } onClick={()=>this.handleClick(value)}>{value}</a></li>
                                    :
                                <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                            ))
                        }
                        
                        
               
                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                    </ul>
                    </nav>
            </div>
            </div>


           }
           </>
        )
    }
}
