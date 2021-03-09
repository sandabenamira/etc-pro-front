import React from "react";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../../util/IntlMessages";
import FinancialReportingList from "./FinancialReportingList";
class FinancialReporting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div   className="app-wrapper justify-content-center  align-items-center"
      style={{
        marginLeft: "2%",
      }}>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.components.financial_management" />}
        />
        <div className=" bd-highlight " style={{ width: "90%" , marginLeft: "2%",}}>
          {" "}
          <FinancialReportingList />
        </div>
      </div>
    );
  }
}

export default FinancialReporting;
