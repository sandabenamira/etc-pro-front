import React from "react";
import ReactApexChart from "react-apexcharts";

class DonutChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [40, 60],

            options: {
                chart: {
                    type: 'donut',
                },


                fill: {
                    colors: ['#F9972D', '#3F51B5'],
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#F9972D', '#3F51B5'],
                    },
                    offsetX: 30,
                    offsetY: 10,
                    background: {
                        enabled: true,
                        opacity: 0.5,
                    },
                },
                legend: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                    show:false
                    
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            show: false,
                            position: 'top'
                        }
                    }
                }]
            },


        };
    }



    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
        );
    }
}
export default DonutChart;
