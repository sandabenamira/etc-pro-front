import React from "react";
import ReactApexChart from "react-apexcharts";

class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: ["nb"],
                data: [4, 5, 8, 6, 7]
            }],
            options: {
                menu: {enabled:false},
                fill: {
                    colors: ['#484cb4']
                },
                chart: {
                    toolbar:{
                            show: false
                    },
                    height: 250,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        borderRadius: 0,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },

                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val;
                    },
                    offsetY: -21,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },

                xaxis: {
                    categories: ["18-25", "26-35", "36-45", "46-55", "55+"],
                    position: 'bottom',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0,
                            }
                        }
                    },
                    tooltip: {
                        enabled: false,
                        
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val;
                        }
                    },
                    tooltip: {
                        enabled: false,
                        
                    }

                },
                tooltip: {
                    enabled: false,
                    show:false
                    
                }
                
             
            },


        };
    }



    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={250} />
            </div>
        );
    }
}

export default BarChart;