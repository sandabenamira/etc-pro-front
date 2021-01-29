import React from 'react';
import CallRegister from './CallRegister';
import { Component } from 'react';
import { connect } from "react-redux";
import { getContextualEventsByprofessor } from "../../../actions/RegistreAction";
import ContainerHeader from '../../../components/ContainerHeader/index';
import IntlMessages from '../../../util/IntlMessages';
import _ from "lodash";

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile
  }
}

class Registre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establishment_id: "",
      refresh: true
    }
  }
  componentDidMount() {

  }

  componentDidUpdate() {
     // if (!(_.isEmpty(this.props.userProfile.establishment_id))) {
 
    //   this.setState({ establishment_id: this.props.userProfile.establishment_id }, () => {
    //     if (this.state.establishment_id) { this.setState({ refresh: false }) }
    //   })
    // }
  }

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader title={<IntlMessages id="sidebar.customViews.studentList" />} match={this.props.match} />
        <CallRegister userProfile={this.props.userProfile} 
         />
      </div>
    );
  }

}
export default connect(mapStateToProps, { getContextualEventsByprofessor })(Registre);