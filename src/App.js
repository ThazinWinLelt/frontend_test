import React, { Component } from "react";
import "./styles/main.css";
import $ from "jquery";
import no_image from "./images/no-image.jpg";
import { FaBars, FaStar, FaSearch } from "react-icons/fa";

import MovieComponent from "./components/MovieComponent.jsx";
import WatchListComponent from "./components/WatchListComponent.jsx";

class App extends Component {
  state = {
    movies: {},
    movieactive: "popular",
    tabactive: "movie",
    rows: []
  };

  componentDidMount() {
    if (this.state.tabactive === "movie") {
      this.getPopularHandler();
    } else if (this.state.tabactive === "watchlist") {
    }
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

    this.setState({ movieactive: "popular" });
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

    this.setState({ movieactive: "top-rated" });
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

    this.setState({ movieactive: "upcoming" });
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

    this.setState({ movieactive: "now-play" });
  }

  setMoviesList(movies) {
    if (movies != null) {
      movies.forEach(movie => {
        const releaseDate = movie.release_date;
        movie.release_date = releaseDate.substring(0, 4);
      });
      this.setState({ movies: movies });
    } else {
      this.setState({ movies: {} });
    }
  }

  getMoviesList(movies) {
    const movieRows = [];

    if (movies != null) {
      movies.forEach(movie => {
        movie.poster_src =
          movie.poster_path === null
            ? no_image
            : "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        const movieRow = <MovieComponent key={movie.id} movie={movie} />;
        movieRows.push(movieRow);
      });
    }

    this.setState({ rows: movieRows });
  }

  getWatchList(movies) {
    const movieRows = [];

    if (movies != null) {
      movies.forEach(movie => {
        movie.poster_src =
          movie.poster_path === null
            ? no_image
            : "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        const movieRow = <WatchListComponent key={movie.id} movie={movie} />;
        movieRows.push(movieRow);
      });
    }

    this.setState({ rows: movieRows });
  }

  openMovie(event) {
    this.setState({ tabactive: "movie" });

    this.getPopularHandler();
  }

  openWatchlist(event) {
    this.setState({ tabactive: "watchlist" });
    let local = [];
    local = localStorage.getItem("watchlist");

    if (local) {
      local = JSON.parse(local);
    }

    this.setMoviesList(local);
    this.getWatchList(local);
  }

  searchWatchlistHandler(event) {
    const searchTerm = event.target.value;
    let local = [];
    local = localStorage.getItem("watchlist");

    let searchMovies = [];

    if (local) {
      local = JSON.parse(local);

      if (searchTerm !== "") {
        local.forEach(local => {
          let title = local.original_title.toLocaleLowerCase();
          if (title.indexOf(searchTerm) >= 0) {
            searchMovies.push(local);
          }
        });
        local = searchMovies;
      }
    }

    this.setMoviesList(local);
    this.getWatchList(local);
  }

  searchMovieHandler(event) {
    const searchTerm = event.target.value;

    if (searchTerm === "") {
      this.getPopularHandler();
    } else {
      const urlString =
        "https://api.themoviedb.org/3/search/movie?api_key=3f65479b1b805e16f59869747d8ef2bf&query=" +
        searchTerm;
      $.ajax({
        url: urlString,
        success: searchResults => {
          const movies = searchResults.results;
          this.setMoviesList(movies);
          this.getMoviesList(movies);
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data");
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div className="tab">
          <button
            className={
              this.state.tabactive === "movie" ? "tablinks active" : "tablinks"
            }
            onClick={e => this.openMovie(e)}
          >
            <FaBars className="bars" />
          </button>
          <button
            className={
              this.state.tabactive === "watchlist"
                ? "tablinks active"
                : "tablinks"
            }
            onClick={e => this.openWatchlist(e)}
          >
            <FaStar className="stars" />
          </button>
        </div>

        <div className="main">
          <div className="header">
            {this.state.tabactive === "movie" ? "All Movies" : "WatchList"}
            <br />
            <hr className="line-2" />
          </div>
          <div className="search">
            <FaSearch className="search-icon" />
            <input
              className="searchBox"
              onChange={
                this.state.tabactive === "movie"
                  ? this.searchMovieHandler.bind(this)
                  : this.searchWatchlistHandler.bind(this)
              }
              placeholder="Search..."
            />
          </div>
        </div>
        <div
          id="movie"
          className="tabcontent"
          style={
            this.state.tabactive === "movie"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <div className="buttons">
            <button
              onClick={this.getPopularHandler.bind(this)}
              className={
                this.state.movieactive === "popular"
                  ? "popular active"
                  : "popular"
              }
            >
              popular
            </button>
            <button
              onClick={this.getTopRatedHandler.bind(this)}
              className={
                this.state.movieactive === "top-rated"
                  ? "top-rated active"
                  : "top-rated"
              }
            >
              top rated
            </button>
            <button
              onClick={this.getUpcomingHandler.bind(this)}
              className={
                this.state.movieactive === "upcoming"
                  ? "upcoming active"
                  : "upcoming"
              }
            >
              upcoming
            </button>
            <button
              onClick={this.getNowPlayHandler.bind(this)}
              className={
                this.state.movieactive === "now-play"
                  ? "now-play active"
                  : "now-play"
              }
            >
              now playing
            </button>
          </div>
          <div className="body container-fluid" style={{ paddingTop: "20px" }}>
            <div className="row">{this.state.rows}</div>
          </div>
        </div>

        <div
          id="watchlist"
          className="tabcontent"
          style={
            this.state.tabactive === "watchlist"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <div className="body container-fluid" style={{ paddingTop: "20px" }}>
            <div className="row">{this.state.rows}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
