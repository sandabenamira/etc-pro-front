import React, { Component } from "react";
import Comments from "./CommentsTable";
import IntlMessages from "../../../../../util/IntlMessages";
import StackedBarChart from "./StackedBarChart";
import CardHeader from "../../../../../components/dashboard/default/CardHeader";
import CardBox from "../../../../../components/CardBox";
import SimpleRadarChart from "./SimpleRadarChart";
export default class ReportingKPI extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center flex-column align-items-center">
        <div>
          <h1>
            <strong>KPI</strong>{" "}
          </h1>
        </div>
        <div class="p-2 col-lg-12 col-12 ">
          <SimpleRadarChart />
        </div>
        <div class="p-2 col-lg-9 col-12 ">
          <div className="jr-card jr-full-card overflow-hiden">
            <CardHeader title="Commentaires" />
            <Comments />
          </div>
        </div>
        <div class="p-2 col-lg-9 col-12 ">
          <StackedBarChart />
        </div>
      </div>
    );
  }
}
