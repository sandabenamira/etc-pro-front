import React from "react";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../../util/IntlMessages";
import FinancialReportingList from "./FinancialReportingList";
class FinancialReporting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.components.financial_management" />}
        />
        <div>
            <FinancialReportingList />
        </div>
      </div>
    );
  }
}

export default FinancialReporting;
