import React, { Component } from "react";
import "../styles/main.css";
import ModalVideo from "./ModalVideo.jsx";
import $ from "jquery";
import { Card, CardBody, CardTitle } from "reactstrap";

class Trailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);

    const movieid = this.props.movieid;
    let trailers = {};
    let trailer = [];
    let channel = [];
    const trailerUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "/videos?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: trailerUrl,
      success: (result, status, xhr) => {
        trailers = result.results;

        trailers.forEach(value => {
          if (value.type === "Trailer") {
            trailer.push(value.key);
            channel.push(value.site.toLowerCase());
          }
        });

        trailer = trailer.splice(0, 1);
        channel = channel.splice(0, 1);
        this.setState({ trailer: trailer });
        this.setState({ channel: channel });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <Card className="card-2" key="trailer" style={{ border: "none" }}>
        <ModalVideo
          channel={this.state.channel + ""}
          isOpen={this.state.isOpen}
          videoId={this.state.trailer}
          onClose={() => this.setState({ isOpen: false })}
          title={this.state.trailer}
        />
        <CardBody className="trailer" style={{ padding: "0" }}>
          <svg onClick={this.openModal} width="70" height="70">
            <circle cx="35" cy="35" r="30" className="circle" />
            <polygon className="polygon" points="28,18 47,35 28,52" />
          </svg>
          <CardTitle className="trailer-text" style={{ marginBottom: "0" }}>
            Play Trailer
          </CardTitle>
        </CardBody>
      </Card>
    );
  }
}

export default Trailer;
