import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";
import { Card, CardImg, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import no_image from "../images/noprofile.png";

class Cast extends Component {
  state = {
    character: [],
    name: [],
    profile_path: []
  };

  constructor(props) {
    super(props);
    const movieid = this.props.movieid;
    // const movieid = 284053;

    const castUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "/credits?api_key=3f65479b1b805e16f59869747d8ef2bf";
    $.ajax({
      url: castUrl,
      success: (result, status, xhr) => {
        const character = [];
        const name = [];
        const profilepath = [];
        const cast = result.cast.slice(0, 5);

        for (const [index, value] of cast.entries()) {
          character[index] =
            value.character === null || value.character === undefined
              ? ""
              : value.character;
          name[index] =
            value.name === null || value.name === undefined ? "" : value.name;
          profilepath[index] =
            value.profile_path === null || value.profile_path === undefined
              ? ""
              : value.profile_path;
        }

        this.setState({ character });
        this.setState({ name });
        this.setState({ profile_path: profilepath });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  render() {
    const casts = [];
    for (const [index, value] of this.state.profile_path.entries()) {
      const path =
        value === "" ? no_image : "https://image.tmdb.org/t/p/w185" + value;
      casts.push(
        <Card
          className="cast-img"
          key={index}
          style={{ border: "none", marginRight: "1em" }}
        >
          <CardImg src={path} alt={value} style={{ borderRadius: "0px" }} />
          <CardBody style={{ padding: "0" }}>
            <CardTitle className="cast-title">
              {this.state.name[index]}
            </CardTitle>
            <CardSubtitle className="cast-title cast-sub">
              {this.state.character[index]}
            </CardSubtitle>
          </CardBody>
        </Card>
      );
    }

    return <React.Fragment>{casts}</React.Fragment>;
  }
}

export default Cast;
