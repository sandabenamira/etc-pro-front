import React, { Component } from "react";
import { connect } from "react-redux";

import ArshivedUserList from "./ArshivedUserList";
import AddUser from "./AddUser";
// import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export class ArshivedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openaddUser = this.openaddUser.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  openaddUser() {
    this.setState({ isOpen: true });
  }
  handleCancel() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
          <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
            <div className="p-2">
              <div className="package-footer d-flex justify-content-start">
                <IconButton
                  aria-label="delete"
                  style={{
                    color: "#blue",
                    backgroundColor: "#blue",
                    width: "28px",
                    height: "28px",
                  }}
                  onClick={this.props.handleopenArchived}


                >
                  <ArrowBackIosOutlinedIcon />
                </IconButton>
                <h1
                  style={{
                    color: "#484cb4",
                    marginBottom: "5%",
                    fontSize: "26px",
                  }}
                >
                  Gestion des Utilisateurs- Archive
                </h1>
              </div>

            </div>
          </div>

          <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
            <ArshivedUserList openaddUser={this.openaddUser} />
          </div>
          {this.state.isOpen && (
            <AddUser values={this.state} handleCancel={this.handleCancel} />
          )}
        </div>
        <div className="d-flex flex-row-reverse p-2 col-lg-10 col-md-12 col-sm-12 mt-4">
          <div
            className="d-flex "
            style={{
              color: "#A4A4A4",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "20px",
            }}
          >

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ArshivedUser);
