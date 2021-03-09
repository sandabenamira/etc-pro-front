import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class CustomChart extends Component {
  render() {   /* eslint eqeqeq: "off" */
    const {labels,label, borderColor, chartdata, pointBackgroundColor,pointHoverBorderColor, height, pointBorderColor, borderWidth, xAxes,shadowColor } = this.props;
    const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const _stroke = ctx.stroke;
      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 13;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 12;
        _stroke.apply(this, arguments);
        ctx.restore();
      };
      return {
        labels: labels,
        datasets: [
          {
            label: label,
            fill: false,
            tension: 0.40,
            fillOpacity: 0.3,
            borderColor: borderColor,
            borderWidth: '4',
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderWidth: '0',
            pointHoverBackgroundColor: pointBackgroundColor,
            pointHoverBorderColor: pointHoverBorderColor,
            pointHoverBorderWidth: '4',
            pointHoverRadius:'6',
            pointRadius: 3,
            pointHitRadius: 8,
            data: chartdata,
          }
        ]
      }
    }

    const options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            min: 0,
            display: false,
          },
          gridLines: {
            display: true,
            drawBorder: false,
            lineWidth:3,
          }
        }],

        yAxes: [{
          display: false,
          ticks: {
            suggestedMin: 0,
            beginAtZero: true
          }
        }]
      },
    };
    return (
      <Line data={data} options={options} height={height} />
    );
  }
}
export default CustomChart;

