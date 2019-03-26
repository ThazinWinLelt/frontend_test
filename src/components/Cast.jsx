import React, { Component } from "react";
import "../styles/main.css";
import $ from "jquery";

class Cast extends Component {
    state = {
        cast: {}
      };
    
      constructor(props) {
        super(props);
        const movieid = this.props.movieid;
    
        const castUrl =
          "https://api.themoviedb.org/3/movie/" +
          movieid +
          "/credits?api_key=3f65479b1b805e16f59869747d8ef2bf";
        $.ajax({
          url: castUrl,
          success: (result, status, xhr) => {
            this.setState({ crew: result.cast });
            console.log(this.state.cast);
          },
          error: (xhr, status, err) => {
            console.error("Failed to fetch data");
          }
        });
      }
    render() { 
        return (  );
    }
}
 
export default Cast;