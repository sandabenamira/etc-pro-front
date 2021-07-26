import React from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import img2 from "../../../assets/images/supAdmin.png";
import Chart from "react-google-charts";
import moment from "moment";
import ActivityItem from "./ActivityItem";
import { Card, CardBody, CardHeader } from "reactstrap";
import CalendarComponent from "./CalendarComponentNew";
const listOnLineCourse = [
  {
    subjectName: "info",
    profSurname: "hamza",
    profName: "khlifi",
    start_time_class: new Date(),
    end_time_class: new Date(),
  },
  {
    subjectName: "math",
    profSurname: "bouraoui",
    profName: "khlifi",
    start_time_class: new Date(),
    end_time_class: new Date(),
  },
];
class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div
        className="app-wrapper"
        // style={{
        //   marginLeft: '5%',
        //   marginRight: '10%',
        // }}
      >
        <div className="d-flex flex-wrap flex-row bd-highlight mb-3 col-lg-12 col-md-12  col-sm-12">
          <div className="p-2 bd-highlight col-lg-8 col-md-12  col-sm-12 ">
            <div className="d-flex flex-wrap flex-column bd-highlight mb-3">
              <div className="p-2 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="media jr-featured-item "
                  style={{ borderRadius: "30px", background: "#484cb4" }}
                >
                  <div className="media-body jr-featured-content">
                    <div className="jr-featured-content-left">
                      <h1 className="mb-2 text-white p-3">
                        Bienvenue M/Mme. Admin ADMIN{" "}
                      </h1>
                      <div className="row-flex">
                        <div className="media text-white p-3">
                          <h3>
                            {" "}
                            Le futur de l'éducation est entre vos mains .
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="jr-featured-content-right jr-profile-content-right">
                      <div className="jr-featured-thumb mt-3">
                        <Avatar className="size-90" alt="..." src={img2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap  flex-row bd-highlight mb-3  justify-content-around">
                <div className="p-2 bd-highlight col-lg-5 col-md-5 col-sm-12">
                  <div className="card jr-card-intra shadow text-center">
                    <div className="card-header py-3 d-flex align-items-center">
                      <h3 className="mb-0">
                        {/* <IntlMessages id="sidebar.view" /> */}
                        Budget investi
                      </h3>
                      <span className="badge badge-primary ml-auto">
                        {/* <IntlMessages id="dashboard.monthly" /> */}
                        Ce mois
                      </span>
                    </div>
                    <div className="stack-order  py-4 px-2">
                      <h1 className="chart-f30">386,200</h1>
                      <span className="h3 text-muted">
                        {/* <IntlMessages id="dashboard.totalView" /> */}
                        progression
                      </span>
                      <span className="h5 text-green">
                        <i className="zmdi zmdi-flash zmdi-hc-fw" />
                        20%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-2 bd-highlight col-lg-5 col-md-5 col-sm-12">
                  <div className="card jr-card-intra shadow text-center">
                    <div className="card-header py-3 d-flex align-items-center">
                      <h3 className="mb-0">
                        {/* <IntlMessages id="sidebar.view" /> */}
                        Budget retourné
                      </h3>
                      <span className="badge badge-primary ml-auto">
                        {/* <IntlMessages id="Ce mois" /> */}
                        Ce mois
                      </span>
                    </div>
                    <div className="stack-order  py-4 px-2">
                      <h1 className="chart-f30">386,200</h1>
                      <span className="h3 text-muted">
                        {/* <IntlMessages id="dashboard.totalView" /> */}
                        progression
                      </span>
                      <span className="h5 text-green">
                        <i className="zmdi zmdi-flash zmdi-hc-fw" />
                        50%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12">
                <div
                  className="jr-card"
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  <Chart
                    height={"400px"}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["x", "Investi", "Retourné"],
                      ["Mai", 0, 0],
                      ["Juin", 100, 500],
                      ["Juillet", 230, 1500],
                      ["Aout", 170, 900],
                      ["September", 180, 1000],
                      ["November", 900, 500],
                    ]}
                    options={{
                      hAxis: {
                        title: "Mois",
                      },
                      vAxis: {
                        title: "Budget en DT",
                      },
                      series: {
                        1: { curveType: "function" },
                      },
                    }}
                    rootProps={{ "data-testid": "2" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 bd-highlight mb-3 col-lg-4 col-md-12 col-sm-12">
            <div className="d-flex flex-wrap flex-column bd-highlight mb-3">
              <div className="p-2 bd-highlight p-2 col-lg-12 col-md-12 col-sm-12 ">
                <CalendarComponent newArrOfEvent={[]}  />
              </div>
              <div className="p-2 bd-highlight p-2 col-lg-12 col-md-12 col-sm-12 ">
              <Card className={`shadow border-0 text-center`}>
                <CardHeader
                  className=" text-white"
                  style={{ backgroundColor: "#00b4d8" }}
                >
                  {"Formations programmées"}
                </CardHeader>
                <CardBody>
                  <div>
                    {listOnLineCourse.map((item, index) => {
                      return (
                        <div
                          className="media user-profile"
                          key={"taskId-" + index}
                        >
                          <Avatar
                            className={"size-40 mr-3"}
                            style={{ fontSize: 11, background: "#00b4d8" }}
                          >
                            {moment(item.date_virtual_class).format("DD")}
                            <br />
                            {moment(item.date_virtual_class).format("MMM")}
                          </Avatar>
                          <ActivityItem item={item} />
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Home);
