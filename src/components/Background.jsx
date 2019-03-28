import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";
import { Card, CardImg } from "reactstrap";

class Background extends Component {
  state = { images: [] };

  constructor(props) {
    super(props);

    const movieid = this.props.movieid;
    // const movieid = 284053;

    const backgroundUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "/images?api_key=3f65479b1b805e16f59869747d8ef2bf";
    $.ajax({
      url: backgroundUrl,
      success: (result, status, xhr) => {
        const backdrops = result.backdrops.slice(0, 4);

        const images = [];
        for (const [index, value] of backdrops.entries()) {
          images[index] = value.file_path;
        }

        this.setState({ images });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  render() {
    const backgrounds = [];
    for (const [index, value] of this.state.images.entries()) {
      backgrounds.push(
        <Card
          className="card-3"
          key={index}
          style={{
            border: "none",
            backgroundColor: "#3C4665"
          }}
        >
          <CardImg
            width="100%"
            src={"https://image.tmdb.org/t/p/original" + value}
            alt={value}
          />
        </Card>
      );
    }

    return <React.Fragment>{backgrounds}</React.Fragment>;
  }
}

export default Background;
