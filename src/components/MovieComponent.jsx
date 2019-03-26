import React, { Component } from "react";
import { Col } from "reactstrap";
import $ from "jquery";
import DetailPopup from "./DetailPopup.jsx";

class MovieComponent extends Component {
  state = {
    genre: "",
    showPopup: false
  };

  constructor(props) {
    super(props);
    const movieID = this.props.movie.id;
    const urlString =
      "https://api.themoviedb.org/3/movie/" +
      movieID +
      "?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: urlString,
      success: (result, status, xhr) => {
        const genres = result.genres;
        const genreName = [];
        genres.forEach(genre => {
          genreName.push(genre.name);
        });
        this.setState({ genre: genreName.join() });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <Col md="6">
        <br />
        <img
          src={this.props.movie.poster_src}
          width="150px"
          height="200px"
          alt="movie poster"
        />
        <br />
        <button onClick={this.togglePopup.bind(this)}>
          {this.props.movie.title}
        </button>
        <br />
        {this.state.genre}
        <br />
        {this.props.movie.release_date}
        <br />

        {this.state.showPopup ? (
          <DetailPopup
            movieid={this.props.movie.id}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </Col>
    );
  }
}

export default MovieComponent;
