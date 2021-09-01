import React, { Component } from "react";
import { connect } from "react-redux";

import UsersList from "./UsersList";
import AddUser from "./AddUser";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ArshivedUser from './ArshivedUser'
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      archived: false
    };
    this.openaddUser = this.openaddUser.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleopenArchived = this.handleopenArchived.bind(this)
  }

  handleopenArchived() {
    this.setState({ archived: !this.state.archived });
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

    if (this.state.archived !== true) {
      return (
        <div className="app-wrapper ">
          <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
              <div className="p-2">
                <h1
                  style={{
                    color: "#484cb4",
                    marginBottom: "5%",
                    fontSize: "26px",
                  }}
                >
                  <IntlMessages id="sidebar.usersManagement" />
                </h1>
              </div>
            </div>

            <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
              <UsersList openaddUser={this.openaddUser} />
            </div>
            {this.state.isOpen && (
              <AddUser values={this.state} handleCancel={this.handleCancel} />
            )}
          </div>
          <div className="d-flex flex-row-reverse  col-lg-12 col-md-12 col-sm-12 ">
            <div
              className="d-flex justify-content-start align-items-center "
              style={{
                color: "#616A6B",
                textAlign: "center",
                fontSize:"25px"
                
              }}
            >
              <IconButton
                aria-label="archive"
                style={{
                  color: "#A4A4A4",
                  backgroundColor: "#FFFFFF",
                  width: "40px",
                  height: "40px",
                }}
                onClick={this.handleopenArchived}
              >
                <DeleteOutlineRoundedIcon backgroundColor="white" />
              </IconButton>
              <div className="p-2"><IntlMessages id="archive" />(5)</div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return <ArshivedUser handleopenArchived={this.handleopenArchived} />
    }
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(User);
