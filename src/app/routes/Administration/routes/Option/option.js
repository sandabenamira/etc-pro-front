import React from 'react';
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../../util/IntlMessages";
import AddOption from './AddOption';
import { connect } from "react-redux";
import { UncontrolledAlert } from "reactstrap";

class Option extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }



    render() {

        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.components.options" />} />
                {this.props.successStatus ? (
                    <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
                        <span className="icon-addon alert-addon">
                            <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                        </span>
                        <span className="d-inline-block">
                            {" "}
                            {this.props.message}{" "}
                        </span>
                    </UncontrolledAlert>
                ) : (
                        ""
                    )}
                {this.props.errorStatus ? (
                    <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                        <span className="icon-addon alert-addon">
                            <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                        </span>
                        <span className="d-inline-block">
                            {" "}{this.props.message}{" "}
                        </span>
                    </UncontrolledAlert>
                ) : (
                        ""
                    )}
                <AddOption establishment_id={this.props.userProfile.establishment_id} />

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userProfile: state.auth.userProfile,
        successStatus: state.alert.success,
        errorStatus: state.alert.error,
        message: state.alert.message,
    };
};

export default connect(mapStateToProps)(Option);