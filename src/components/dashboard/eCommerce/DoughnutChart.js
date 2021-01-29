import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';





class DoughnutChart extends Component {

  render() {
    const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const _stroke = ctx.stroke;
      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = 'rgba(76,175,80,0.8)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 12;
        _stroke.apply(this, arguments);
        ctx.restore();
      };
      return {
        labels: [
          'female',
          'male',
        ],
        datasets: [{
          data: [this.props.nbreGirls, this.props.nbreBoys],
          backgroundColor: ['#e8436c','#4548cc'],
          borderColor: ['#e8436c','#4548cc'],
          hoverBackgroundColor: ['#e8436c','#4548cc'],
        }],
    
      }
    }
    
    const options = {
      legend: {
        display: false,
        labels: {
          fontColor: '#AAAEB3'
        }
      },
      layout: {
        padding: {
          bottom: 20
        }
      },
      cutoutPercentage: 75,
      borderWidth: 0
    };
    return (
      <Doughnut  data={data} options={options} height={235}/>
    );
  }
}

export default DoughnutChart;