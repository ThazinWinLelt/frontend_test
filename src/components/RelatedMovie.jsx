import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";

class RelatedMovie extends Component {
  state = {
    recomd: [],
    title: []
  };
  constructor(props) {
    super(props);
    const collectionid = this.props.collectionid.id;

    const recomdUrl =
      "https://api.themoviedb.org/3/collection/" +
      collectionid +
      "?api_key=3f65479b1b805e16f59869747d8ef2bf";
    $.ajax({
      url: recomdUrl,
      success: (result, status, xhr) => {
        console.log(result.parts);
        const recomd = [];
        const title = [];

        for (const [index, value] of result.parts.entries()) {
          recomd[index] = value.poster_path;
          title[index] = value.title;
        }
        this.setState({ recomd });
        this.setState({ title });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  setImageDisplay() {
    console.log(this.state);
    return "here";
  }

  render() {
    const images = [];
    for (const [index, value] of this.state.title.entries()) {
      if (this.state.recomd[index] != null) {
        images.push(
          <img
            src={"https://image.tmdb.org/t/p/w185" + this.state.recomd[index]}
            width="70px"
            height="110px"
            alt={value}
          />
        );
      }
    }

    return <React.Fragment>{images}</React.Fragment>;
  }
}

export default RelatedMovie;
