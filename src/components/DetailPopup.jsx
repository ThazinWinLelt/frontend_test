import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";
import DonutChart from "./DonutChart.jsx";
import RelatedMovie from "./RelatedMovie.jsx";
// import Crew from "./Crew.jsx";

class DetailPopup extends Component {
  state = {
    apiKey: "3f65479b1b805e16f59869747d8ef2bf",
    detail: {},
    background: {}
  };

  constructor(props) {
    super(props);
    const movieid = this.props.movieid;

    const detailUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: detailUrl,
      success: (result, status, xhr) => {
        this.setState({ detail: result });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });

    const backgroundUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "/images?api_key=3f65479b1b805e16f59869747d8ef2bf";
    $.ajax({
      url: backgroundUrl,
      success: (result, status, xhr) => {
        this.setState({ background: result });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <button onClick={this.props.closePopup}>back to the list</button>
          <table key={this.props.movieid}>
            <tbody>
              <tr>
                <td>
                  <img
                    srcSet={
                      "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
                      this.state.detail.poster_path +
                      " 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                      this.state.detail.poster_path +
                      " 2x"
                    }
                    sizes="auto"
                    width="300px"
                    height="340px"
                    src={
                      "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
                      this.state.detail.poster_path
                    }
                    alt={this.state.detail.title}
                  />
                  <br />
                  Related Movies
                  <br />
                  {this.state.detail.belongs_to_collection != null && (
                    <RelatedMovie
                      collectionid={this.state.detail.belongs_to_collection}
                    />
                  )}
                </td>
                <td>
                  <div>
                    <h3>{this.state.detail.title}</h3>
                    <br />
                    <DonutChart value={this.state.detail.vote_average} />
                  </div>
                  <hr />
                  <div>
                    Overview
                    <p>{this.state.detail.overview}</p>
                  </div>
                  <div>{/* <Crew movieid={this.props.movieid} /> */}</div>
                  <hr />
                  <div>Top Billed Cast</div>
                  <hr />
                  <div>Backgrounds</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DetailPopup;
