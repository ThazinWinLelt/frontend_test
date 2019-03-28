import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";

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

  render() {
    const images = [];
    for (const [index, value] of this.state.title.entries()) {
      if (this.state.recomd[index] != null) {
        images.push(
          <Card
            className="card-1"
            key={index}
            style={{ border: "none", backgroundColor: "#3c4665" }}
          >
            <CardImg
              width="100%"
              src={"https://image.tmdb.org/t/p/w185" + this.state.recomd[index]}
              alt={value}
              style={{ borderRadius: "0px" }}
            />
            <CardBody style={{ padding: "0" }}>
              <CardTitle className="chart-text-1">{value}</CardTitle>
            </CardBody>
          </Card>
        );
      }
    }

    return <React.Fragment>{images}</React.Fragment>;
  }
}

export default RelatedMovie;
