import React, { Component } from "react";
import IconWithTextCard from "../IconWithTextCard";
import IntlMessages from "../../../../util/IntlMessages";
import CardHeader from "../../../../components/dashboard/default/CardHeader";
import bancLogo from "../../../../assets/images/dashboard/bancLogo.jpg";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
class AdminDashboard extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile != this.props.userProfile) {
      this.setState({
        user: this.props.userProfile,
        profileGenre: this.props.userProfile.user.gender,
        profileAdress: this.props.userProfile.user.address,
        profilePhoto: this.props.userProfile.user.photo,
        birthDayDateProfile: this.props.userProfile.user.date_of_birth,
        profileEstablishment: this.props.userProfile.establishments[0]
          .establishment.name,
        profileRole: this.props.userProfile.roleName,
        // profilePassword:this.props.user.profilePassword,
        profileEmail: this.props.userProfile.user.email,
        profilePhone: "+" + this.props.userProfile.user.phone,
      });
    }
  }
  UNSAFE_componentWillMount() {
    if (this.props.userProfile.user != undefined) {
      this.setState({
        user: this.props.userProfile,
        profileGenre: this.props.userProfile.user.gender,
        profileAdress: this.props.userProfile.user.address,
        profilePhoto: this.props.userProfile.user.photo,
        birthDayDateProfile: this.props.userProfile.user.date_of_birth,
        profileEstablishment: this.props.userProfile.establishments[0]
          .establishment.name,
        profileRole: this.props.userProfile.roleName,
        // profilePassword:this.props.user.profilePassword,
        profileEmail: this.props.userProfile.user.email,
        profilePhone: "+" + this.props.userProfile.user.phone,
      });
    }
  }
  render() {
    console.log("establishments logo", this.props.establishments.logo);
    console.log("establishments name ", this.props.establishments.name);
    let estabName =
      this.props.establishments.name == undefined
        ? ""
        : this.props.establishments.name;
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
    var currentDate = moment(new Date()).format("DD/MM/YYYY");
    return (
      <div className="app-wrapper d-flex flex-column   col-lg-12 col-md-12 col-sm-12">
        <div class="d-flex flex-row flex-wrap justify-content-center col-lg-12 col-md-12 col-sm-12 bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            {this.props.establishments.logo == undefined ? (
              <img
                src={bancLogo}
                alt="Logo"
                style={{ height: "200px", width: "400px" }}
              />
            ) : (
              <img
                src={this.props.establishments.logo}
                alt="Logo"
                style={{ height: "200px", width: "400px" }}
              />
            )}
          </div>
          <div class="p-2 bd-highlight align-self-center">
            <h2>
              Bienvenue{" "}
              <strong style={{ color: "#F08429" }}>
                {" "}
                {this.props.userProfile.user.name +
                  " " +
                  this.props.userProfile.user.surname || ""}
              </strong>{" "}
              dans votre espace{" "}
              <strong style={{ color: "#03497D" }}>
                {estabName.toUpperCase()}
              </strong>{" "}
              <br />
              le <strong>{currentDate}</strong>{" "}
            </h2>
          </div>
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
                <h1 className="chart-f30 font-weight-light">186,200</h1>
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
                <h1 className="chart-f30 font-weight-light">80,800</h1>
                <span className="h3 text-muted">Dinars</span>
                <span className="h5 text-primary">
                  <i className="zmdi zmdi-long-arrow-return zmdi-hc-fw zmdi-hc-rotate-90" />
                  20%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2  row d-flex flex-wrap justify-content-center col-lg-12 col-md-12 col-sm-12">
          {/* ChartCard 1 */}

          {detailCardsRh.map((data, index) => (
            <div
              key={index}
              className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12"
            >
              <IconWithTextCard data={data} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    userProfile: state.auth.userProfile,
    establishments: state.establishment.establishementInformations,
  };
}
export default connect(mapStateToProps)(AdminDashboard);
