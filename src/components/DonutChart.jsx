import React, { Component } from "react";
import "../styles/main.css";

class DonutChart extends Component {
  state = {
    size: 70,
    value: 0,
    strokewidth: 6
  };

  render() {
    const average = this.props.value * 10;
    const halfsize = this.state.size * 0.5;
    const radius = halfsize - this.state.strokewidth * 0.5;
    const circumference = 2 * Math.PI * radius;
    const strokeval = (average * circumference) / 100;
    const dashval = strokeval + " " + circumference;

    const trackstyle = { strokeWidth: this.state.strokewidth };
    const indicatorstyle = {
      strokeWidth: this.state.strokewidth,
      strokeDasharray: dashval
    };
    const rotateval = "rotate(-90 " + halfsize + "," + halfsize + ")";

    return (
      <svg
        width={this.state.size}
        height={this.state.size}
        className="donutchart"
      >
        <circle
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={rotateval}
          style={trackstyle}
          className="donutchart-track"
        />
        <circle
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={rotateval}
          style={indicatorstyle}
          className="donutchart-indicator"
        />
        <text
          className="donutchart-text"
          x={halfsize}
          y={43}
          style={{ textAnchor: "middle" }}
        >
          <tspan className="donutchart-text-val">{average + ""}</tspan>
          <tspan className="donutchart-text-percent">%</tspan>
        </text>
      </svg>
    );
  }
}

export default DonutChart;
