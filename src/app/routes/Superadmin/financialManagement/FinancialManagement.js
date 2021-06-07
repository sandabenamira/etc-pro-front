import React, {Component} from 'react';
import ContainerHeader from '../../../../components/ContainerHeader/index';
import IntlMessages from '../../../../util/IntlMessages';

export default class FinancialManagement extends Component {
  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.components.financial_management" />}
        />
        <h1>FinancialManagement</h1>
      </div>
    );
  }
}
