import React, { Component } from "react";
import "./styles/main.css";
import $ from "jquery";
import MovieComponent from "./components/MovieComponent.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {}
    };

    this.getPopularHandler();
  }
  getPopularHandler() {
    const urlString =
      "https://api.themoviedb.org/3/movie/popular?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: urlString,
      success: (result, status, xhr) => {
        const movies = result.results;
        this.setMoviesList(movies);
        this.getMoviesList(movies);
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  getTopRatedHandler() {
    const urlString =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: urlString,
      success: (result, status, xhr) => {
        const movies = result.results;
        this.setMoviesList(movies);
        this.getMoviesList(movies);
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  getUpcomingHandler() {
    const urlString =
      "https://api.themoviedb.org/3/movie/upcoming?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: urlString,
      success: (result, status, xhr) => {
        const movies = result.results;
        this.setMoviesList(movies);
        this.getMoviesList(movies);
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  getNowPlayHandler() {
    const urlString =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: urlString,
      success: (result, status, xhr) => {
        const movies = result.results;
        this.setMoviesList(movies);
        this.getMoviesList(movies);
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  setMoviesList(movies) {
    movies.forEach(movie => {
      const releaseDate = movie.release_date;
      movie.release_date = releaseDate.substring(0, 4);
    });
    this.setState({ movies: movies });
  }

  getMoviesList(movies) {
    const movieRows = [];
    console.log(movies);
    movies.forEach(movie => {
      movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
      const movieRow = <MovieComponent key={movie.id} movie={movie} />;
      movieRows.push(movieRow);
    });

    this.setState({ rows: movieRows });
  }

  render() {
    return (
      <div className="main">
        <div className="header">All Movies</div>
        <div className="buttons">
          <input
            type="button"
            onClick={this.getPopularHandler.bind(this)}
            className="popular"
            value="popular"
          />
          <input
            type="button"
            onClick={this.getTopRatedHandler.bind(this)}
            className="top-rated"
            value="top rated"
          />
          <input
            type="button"
            onClick={this.getUpcomingHandler.bind(this)}
            className="upcoming"
            value="upcoming"
          />
          <input
            type="button"
            onClick={this.getNowPlayHandler.bind(this)}
            className="now-play"
            value="now playing"
          />
        </div>
        <div className="body container-fluid">
          <div className="row">{this.state.rows}</div>
        </div>
      </div>
    );
  }
}

export default App;
