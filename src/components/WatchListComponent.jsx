import React, { Component } from "react";
import $ from "jquery";
import DetailPopup from "./DetailPopup.jsx";
import "../styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "reactjs-popup";

import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardImgOverlay,
  CardText
} from "reactstrap";

class WatchListComponent extends Component {
  state = {
    genre: "",
    open: false,
    remove: false
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

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  removeWatchList() {
    let local = localStorage.getItem("watchlist");
    local = JSON.parse(local);

    this.distinctWatchList(local, this.props.movie.id);
    this.setState({ remove: true });
  }

  distinctWatchList(watchlist, comp) {
    let list = [];

    localStorage.clear("watchlist");
    watchlist.forEach(value => {
      if (value.id !== comp) {
        list.push(value);
      }
    });
    localStorage.setItem("watchlist", JSON.stringify(list));

    return list;
  }

  render() {
    return (
      <Card
        className="card-4"
        key={this.props.movie.id}
        style={
          this.state.remove === false
            ? { border: "none", backgroundColor: "#2b3247" }
            : { border: "none", backgroundColor: "#2b3247", display: "none" }
        }
      >
        <div className="cardoverlay">
          <CardImg
            style={{ borderRadius: "0px" }}
            src={this.props.movie.poster_src}
            alt={this.props.movie.poster_src}
            width="210px"
            height="315px"
          />
          <CardImgOverlay className="overlay" onClick={this.openModal}>
            <CardTitle className="overlay-title">
              {this.props.movie.title}
            </CardTitle>
            <CardText className="overlay-text">
              {this.props.movie.overview}
            </CardText>
          </CardImgOverlay>
        </div>
        <CardBody className="cardbody-1" style={{ padding: "0" }}>
          <CardTitle className="cardtitle-1">
            {this.props.movie.title}
          </CardTitle>
          <div className="cardsub-1">
            Genres:&nbsp;
            <span className="cardsub-3">{this.state.genre}</span>
          </div>
          <div className="cardsub-2">
            Year:&nbsp;
            <span className="cardsub-3">{this.props.movie.release_date}</span>
          </div>
        </CardBody>

        <div className="footer-vote">{this.props.movie.vote_average}</div>
        <div
          className="footer-remove"
          onClick={this.removeWatchList.bind(this)}
        >
          Remove
        </div>

        <Popup
          modal
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          lockScroll
        >
          <DetailPopup
            movieid={this.props.movie.id}
            close={this.closeModal}
            genre={this.state.genre}
            release_date={this.props.movie.release_date}
          />
        </Popup>
      </Card>
    );
  }
}

export default WatchListComponent;
