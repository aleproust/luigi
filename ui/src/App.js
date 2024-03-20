import logo from './logo.svg';
import './App.css';
import Movies from './Components/movies.component';
import { fetchMoviesByGenre, fetchMoviesFromLastMonth } from './Services/movies.service';
import { Component } from 'react';
import { fetchGenres } from './Services/genre.service';

export default class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      movies: [],
      genres: []
    }
  }
  async componentDidMount(){
    const movies = await fetchMoviesFromLastMonth();
    const genres = await fetchGenres();
    this.setState({movies, genres})
  }
  render(){
    return (
      <div className="App">
        <button onClick={this.onFilterReleaseDateClick} > Filter Release date</button>
        <select onChange={ e=> this.onGenreSelected(e.target.value)}>
          <option></option>
          {
            this.state.genres.map(({id, name})=> 
            <option value={id}>{name}</option>)
          }
        </select>
        <Movies movies={this.state.movies}/>
      </div>
    );
  } 

  onFilterReleaseDateClick =  async () =>{
    const movies = await fetchMoviesByGenre(14, '')
    this.setState({movies})
  }

  onGenreSelected = async (value) => {
    if(value){
      const movies = await fetchMoviesByGenre(value, 'release_date')
      this.setState({movies})
    }
    
  }
}


