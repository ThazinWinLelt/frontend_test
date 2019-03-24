import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";
import Chart from "./Chart.jsx";

class DetailPopup extends Component {
  state = {
    apiKey: "3f65479b1b805e16f59869747d8ef2bf",
    detail: {},
    recomd: [],
    crew: {},
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
        //console.log(this.state.detail);
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });

    const recomdUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "/recommendations?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US&page=1";
    $.ajax({
      url: recomdUrl,
      success: (result, status, xhr) => {
        const recomd = [];

        for (const [index, value] of result.results.entries()) {
          recomd[index] = value.poster_path;
        }
        this.setState({ recomd: recomd });
        console.log(this.state.recomd);
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });

    const crewUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "/credits?api_key=3f65479b1b805e16f59869747d8ef2bf";
    $.ajax({
      url: crewUrl,
      success: (result, status, xhr) => {
        this.setState({ crew: result });
        //console.log(result);
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
        //console.log(result);
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
                    src={
                      "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
                      this.state.detail.poster_path
                    }
                    width="300px"
                    height="350px"
                    alt={this.state.detail.title}
                  />
                  <br />
                  <div>
                    Related Movies
                    <br />
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w185" + this.state.recomd[0]
                      }
                      width="100px"
                      height="180px"
                      alt={this.state.recomd.title}
                    />
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w185" + this.state.recomd[1]
                      }
                      width="100px"
                      height="180px"
                      alt={this.state.recomd.title}
                    />
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w185" + this.state.recomd[2]
                      }
                      width="100px"
                      height="180px"
                      alt={this.state.recomd.title}
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <h3>{this.state.detail.title}</h3>
                    <br />
                    {/* <Chart /> */}
                  </div>
                  <hr />
                  <div>
                    Overview
                    <p>{this.state.detail.overview}</p>
                  </div>
                  <div>Featrued Crew</div>
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
