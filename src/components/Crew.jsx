import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";

class Crew extends Component {
  state = {
    crew: {}
  };

  constructor(props) {
    super(props);
    const movieid = this.props.movieid;

    const crewUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "/credits?api_key=3f65479b1b805e16f59869747d8ef2bf";
    $.ajax({
      url: crewUrl,
      success: (result, status, xhr) => {
        this.setState({ crew: result.crew });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  render() {
    return (
      <div>
        <h3>crew</h3>
      </div>
    );
  }
}

export default Crew;
