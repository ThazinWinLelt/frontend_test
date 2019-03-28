import React, { Component } from "react";
import "../styles/main.css";
import { Card, CardTitle, CardBody } from "reactstrap";

class DonutChart extends Component {
  state = {
    size: 70,
    value: 0,
    strokewidth: 4
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
      <Card className="card-2" key="donutchart" style={{ border: "none" }}>
        <CardBody style={{ padding: "0" }}>
          <svg width={80} height={80} className="donutchart">
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
            <text className="donutchart-text" style={{ textAnchor: "middle" }}>
              <tspan className="donutchart-text-val" x={halfsize - 5} y={43}>
                {average + ""}
              </tspan>
              <tspan
                className="donutchart-text-percent"
                x={halfsize + 14}
                y={halfsize - 6}
              >
                %
              </tspan>
            </text>
          </svg>
          <CardTitle className="chart-text">User Score</CardTitle>
        </CardBody>
      </Card>
    );
  }
}

export default DonutChart;
