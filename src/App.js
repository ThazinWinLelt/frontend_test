import React, { Component } from "react";
import "./styles/main.css";
import $ from "jquery";
import MovieComponent from "./components/MovieComponent.jsx";
import { Row } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {}
    };
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

    movies.forEach(movie => {
      movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
      const movieRow = <MovieComponent key={movie.id} movie={movie} />;
      movieRows.push(movieRow);
    });

    this.setState({ rows: movieRows });
  }

  render() {
    return (
      <div>
        <div className="App">
          <input
            type="button"
            onClick={this.getPopularHandler.bind(this)}
            value="popular"
          />
          <input
            type="button"
            onClick={this.getTopRatedHandler.bind(this)}
            value="top rated"
          />
          <input
            type="button"
            onClick={this.getUpcomingHandler.bind(this)}
            value="upcoming"
          />
          <input
            type="button"
            onClick={this.getNowPlayHandler.bind(this)}
            value="now playing"
          />
        </div>
        <Row>{this.state.rows}</Row>
      </div>
    );
  }
}

export default App;
