import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";
import { FaBookmark, FaStar } from "../../node_modules/react-icons/fa";

import DonutChart from "./DonutChart.jsx";
import RelatedMovie from "./RelatedMovie.jsx";
import Cast from "./Cast.jsx";
import Crew from "./Crew.jsx";
import Background from "./Background.jsx";
import Trailer from "./Trailer.jsx";

class DetailPopup extends Component {
  state = {
    apiKey: "3f65479b1b805e16f59869747d8ef2bf",
    detail: {},
    runtime: "",
    watchlist: false
  };

  constructor(props) {
    super(props);
    const movieid = this.props.movieid;
    // const movieid = 284053;

    const detailUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieid +
      "?api_key=3f65479b1b805e16f59869747d8ef2bf&language=en-US";
    $.ajax({
      url: detailUrl,
      success: (result, status, xhr) => {
        this.setState({ detail: result });

        let runtime = this.state.detail.runtime;
        let h = Math.floor(runtime / 60);
        let m = runtime % 60;

        this.setState({ runtime: h + "h " + m + "m" });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  componentDidMount() {
    this.existInWatchList();
  }
  existInWatchList() {
    let local = localStorage.getItem("watchlist");
    local = JSON.parse(local);

    local.forEach(value => {
      if (value.id === this.props.movieid) {
        this.setState({ watchlist: true });
      }
    });
  }

  addWatchlist() {
    let local = localStorage.getItem("watchlist");
    let watchlist = [];

    if (local) {
      watchlist = JSON.parse(local);
      watchlist.push(this.state.detail);
      watchlist = this.distinctWatchList(watchlist, "id");
      let set = new Set(watchlist);
      watchlist = Array.from(set);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } else {
      watchlist.push(this.state.detail);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }

    this.setState({ watchlist: true });
  }

  distinctWatchList(watchlist, comp) {
    const unique = watchlist
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => watchlist[e])
      .map(e => watchlist[e]);

    return unique;
  }

  removeWatchList() {
    let local = localStorage.getItem("watchlist");
    local = JSON.parse(local);

    this.deleteWatchList(local, this.props.movieid);
    this.setState({ watchlist: false });
  }

  deleteWatchList(watchlist, comp) {
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
      <div className="popup-main">
        <div className="popup-body">
          <div className="left-section col-4" style={{ padding: "0" }}>
            <div className="detail-img">
              <button className="backlist" onClick={this.props.close}>
                <svg height="20" width="20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="#50e3c2"
                    strokeWidth="1"
                    fill="transparent"
                  />
                  <polyline
                    points="12,6 7,10 12,14"
                    style={{
                      fill: "transparent",
                      stroke: "#50e3c2",
                      strokeWidth: "1"
                    }}
                  />
                </svg>
                &nbsp;&nbsp;Back to the list
              </button>
              <img
                width="100%"
                src={
                  "https://image.tmdb.org/t/p/original" +
                  this.state.detail.poster_path
                }
                alt={this.state.detail.title}
              />
              <div className="bookmark">
                <span className="bookmark-icon">
                  <FaBookmark />
                </span>
                <span className="bookmark-text">Bookmark</span>
              </div>
              <div
                className="add-watchlist"
                onClick={
                  this.state.watchlist === false
                    ? this.addWatchlist.bind(this)
                    : this.removeWatchList.bind(this)
                }
              >
                <span className="addwatch-icon">
                  <FaStar
                    style={
                      this.state.watchlist === true
                        ? { color: "orange" }
                        : { color: "white" }
                    }
                  />
                </span>
                <span className="addwatch-text">Add Watchlist</span>
              </div>
            </div>
            <h6 className="sub-header" style={{ paddingLeft: "2em" }}>
              {this.state.detail.belongs_to_collection != null &&
                "Related Movies"}
            </h6>
            <div className="container-fluid" style={{ paddingLeft: "2em" }}>
              <div className="row">
                {this.state.detail.belongs_to_collection != null && (
                  <RelatedMovie
                    collectionid={this.state.detail.belongs_to_collection}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="right-section">
            <h3 className="detail-header">{this.state.detail.title}</h3>

            <div className="container-fluid">
              <div className="row">
                <div style={{ width: "100px" }}>
                  <DonutChart value={this.state.detail.vote_average} />
                </div>

                <div style={{ width: "100px" }}>
                  <Trailer movieid={this.props.movieid} />
                </div>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td className="textstyle-1">Genres</td>
                        <td className="textstyle-1 textstyle-2">
                          {this.props.genre}
                        </td>
                      </tr>
                      <tr>
                        <td className="textstyle-1">Release Year</td>
                        <td className="textstyle-1 textstyle-2">
                          {this.props.release_date}
                        </td>
                      </tr>
                      <tr>
                        <td className="textstyle-1">Duration</td>
                        <td className="textstyle-1 textstyle-2">
                          {this.state.runtime}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <hr className="line-1" />

            <h6 className="sub-header">Overview</h6>
            <div className="overview">
              <p>{this.state.detail.overview}</p>
            </div>

            <h6 className="sub-header">Feature Crew</h6>
            <div className="container-fluid">
              <div className="row">
                <Crew movieid={this.props.movieid} />
              </div>
            </div>

            <hr className="line-1" />

            <h6 className="sub-header" style={{ paddingTop: "2em" }}>
              Top Billed Cast
            </h6>
            <div className="container-fluid">
              <div className="row">
                <Cast movieid={this.props.movieid} />
              </div>
            </div>

            <hr className="line-1" />

            <h6 className="sub-header" style={{ paddingBottom: "1em" }}>
              Backgrounds
            </h6>
            <div className="container-fluid">
              <div className="row">
                <Background movieid={this.props.movieid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailPopup;
