import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";

class Crew extends Component {
  state = {
    director: [],
    story: [],
    writer: []
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
        let crews = result.crew;
        let director = [];
        let story = [];
        let writer = [];

        crews.forEach(crew => {
          if (crew.job === "Director") {
            director.push(crew.name);
          } else if (crew.job === "Writer") {
            writer.push(crew.name);
          } else if (crew.job === "Story") {
            story.push(crew.name);
          }
        });

        director = director.splice(0, 1);
        writer = writer.splice(0, 3);
        story = story.splice(0, 1);

        this.setState({ director });
        this.setState({ writer });
        this.setState({ story });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  render() {
    return (
      <div className="crew">
        {this.state.director.map(data => {
          return (
            <div className="col-6" key={data + "-director"}>
              <div className="crew-job">Director</div>
              <div className="crew-name">{data}</div>
            </div>
          );
        })}
        {this.state.writer.map(data => {
          return (
            <div className="col-6" key={data + "-writer"}>
              <div className="crew-job">Writer</div>
              <div className="crew-name">{data}</div>
            </div>
          );
        })}
        {this.state.story.map(data => {
          return (
            <div className="col-6" key={data + " story"}>
              <div className="crew-job">Story</div>
              <div className="crew-name">{data}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Crew;
