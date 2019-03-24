import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";

class Chart extends Component {
  render() {
    const options = {
      annotation: {
        annotations: [
          {
            drawTime: "afterDatasetsDraw",
            borderColor: "red",
            borderDash: [2, 2],
            borderWidth: 2,
            mode: "vertical",
            type: "line",
            value: 10,
            scaleID: "x-axis-0"
          }
        ]
      },
      maintainAspectRation: false
    };
    return <Bar data={65} width={100} height={50} options={options} />;
  }
}
export default Chart;
