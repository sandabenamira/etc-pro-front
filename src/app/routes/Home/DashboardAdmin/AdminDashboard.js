import React, { Component } from "react";
import IconWithTextCard from "../IconWithTextCard";
import IntlMessages from "../../../../util/IntlMessages";
import CardHeader from "../../../../components/dashboard/default/CardHeader";
import logo2 from '../../../../assets/images/dashboard/logo2.jpg';

export default class AdminDashboard extends Component {
  render() {

    const detailCardsRh = [
      {
        cardColor: "primary",
        imageIcon: require("../../../../assets/images/dashboard/project-icon.png"),
        title: "2000",
        subTitle: "Nombre total de collaborateurs en agence",
      },
      {
        cardColor: "info",
        imageIcon: require("../../../../assets/images/dashboard/20.png"),
        title: "1700",
        subTitle: "Nombre de collaborateurs présents",
      },
      {
        cardColor: "warning",
        imageIcon: require("../../../../assets/images/dashboard/tasks-icon.png"),
        title: "200",
        subTitle: "Nombre de collaborateurs en retard",
      },
      {
        cardColor: "secondary",
        imageIcon: require("../../../../assets/images/dashboard/21.png"),
        title: "100",
        subTitle: "Nombre de collaborateurs absents",
      },
    ];
    const detailCardsFr = [
      {
        cardColor: "primary",
        imageIcon: require("../../../../assets/images/dashboard/project-icon.png"),
        title: "10",
        subTitle: "Nombre de formation aujourd'hui ",
      },
      {
        cardColor: "info",
        imageIcon: require("../../../../assets/images/dashboard/20.png"),
        title: "120",
        subTitle: "Nombre de collaborateurs présents en formation ",
      },
      {
        cardColor: "warning",
        imageIcon: require("../../../../assets/images/dashboard/tasks-icon.png"),
        title: "28",
        subTitle: "Nombre de collaborateurs en retard en formation",
      },
      {
        cardColor: "secondary",
        imageIcon: require("../../../../assets/images/dashboard/21.png"),
        title: "15",
        subTitle: "Nombre de collaborateurs absents en formation",
      },
    ];

    return (
      <div className="app-wrapper d-flex flex-column   col-lg-12 col-md-12 col-sm-12">
       <div class="d-flex flex-row flex-wrap justify-content-center col-lg-12 col-md-12 col-sm-12 bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            <img src={logo2} alt="Logo" style={{height:"200px" ,width:"auto"}} />
          </div>
          <div class="p-2 bd-highlight align-self-center">
    <h2>Bienvenu <strong style={{color:"#F08429"}}>Sami OUNI</strong>  dans votre espace <strong style={{color:"#03497D"}}>BIAT</strong> <br/>le  <strong>06/02/2021</strong>  </h2>
          </div>
        </div>
        <div className="p-2  row d-flex flex-wrap justify-content-center col-lg-12 col-md-12 col-sm-12">
          {/* ChartCard 1 */}

          {detailCardsRh.map((data, index) => (
            <div
              key={index}
              className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12" 
            >
              <IconWithTextCard data={data}  />
            </div>
          ))}
        </div>
        <div className="p-2 row  d-flex flex-wrap justify-content-center col-lg-12 col-md-12 col-sm-12">
          {/* ChartCard 2 */}
          {detailCardsFr.map((data, index) => (
            <div
              key={index}
              className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12"
            >
              <IconWithTextCard data={data} />
            </div>
          ))}
        </div>
        <div className="p-2 row  d-flex flex-wrap justify-content-center col-lg-12 col-md-12 col-sm-12">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card shadow text-center">
              <CardHeader
                title="Budget investi"
                rightItemStyle="badge badge-primary"
                updatedAt="Cette semaine"
              />
              <div className="stack-order  py-4 px-2">
                <h1 className="chart-f30 font-weight-light">86,200</h1>
                <span className="h3 text-muted">Dinars</span>
                <span className="h5 text-primary">
                  <i className="zmdi zmdi-long-arrow-return zmdi-hc-fw zmdi-hc-rotate-90" />
                  20%
                </span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card shadow text-center">
              <CardHeader
                title="Budget retourné"
                rightItemStyle="badge badge-primary"
                updatedAt="Cette semaine"
              />
              <div className="stack-order  py-4 px-2">
                <h1 className="chart-f30 font-weight-light">180,800</h1>
                <span className="h3 text-muted">Dinars</span>
                <span className="h5 text-primary">
                  <i className="zmdi zmdi-long-arrow-return zmdi-hc-fw zmdi-hc-rotate-90" />
                  20%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
