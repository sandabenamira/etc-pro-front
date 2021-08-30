import React, { Component } from "react";

import UserListItem from "./UserListItem";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { orange } from "@material-ui/core/colors";

import IntlMessages from "../../../../../util/IntlMessages";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import UserDetails from "./UserDetails";
function createData(photo, nom, prenom, role, email, Ntel) {
  return { photo, nom, prenom, role, email, Ntel };
}

const rows = [
  createData(
    "Achoura",
    "Ahmed",
    "Responsable Formation",
    "aa@jj.com",
    9548745555
  ),
  createData("Ouni", "Med ", "chef du projet", "oo@fef.com", 454184154),
  createData("Béji", "Fatma", "chef d'équipe", "ff@gdnj.com", 5445484455),
  createData(
    "Ben",
    "sami",
    "Responsable Marketing",
    "aadeded@jj.com",
    9548745555
  ),
  createData("salem", "Ahmed", "ouvrier", "accfva@jj.com", 9548745555),
];

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opendetails: false,
    };
    this.opendetailsUser = this.opendetailsUser.bind(this);
  }
  opendetailsUser() {
    console.log("dddddddddddddddddd");
    this.setState({ opendetails: !this.state.opendetails });
  }

  render() {
    return (
      <div className="app-wrapper ">
        {this.state.opendetails && (
          <UserDetails
            values={this.state}
            opendetailsUser={this.opendetailsUser}
          />
        )}
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12 bd-highlight flex-wrap"></div>

        <div className="d-flex justify-content-around bd-highlight flex-wrap">
          <div className="p-2">
            <Button
              variant="contained"
              color="primary"
              style={{
                height: 40,
                width: 220,
                borderRadius: 60,
                fontSize: "20px",
                fontFamily: "Roboto",
                textTransform: "capitalize",
              }}
            >
              <IntlMessages id="permission.role.all" />
              <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
            </Button>
          </div>

          <div className=" d-flex flex-row flex-wrap p-2 col-lg-3 col-md-6  col-sm-4 bd-highlight flex-wrap">
            <Paper
              component="form"
              className="d-flex flex-row"
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                borderRadius: "100px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#565C79",
              }}
            >
              <IconButton aria-label="search">
                <SearchIcon
                  style={{ marginRight: "-100%", color: "#565C79" }}
                />
              </IconButton>
              <InputBase
                style={{
                  marginLeft: "5%",
                  flex: 1,
                  fontWeight: "bold",
                }}
                placeholder="Recherche ..."
                inputProps={{ "aria-label": "search google maps" }}
              />
            </Paper>
          </div>

          <div className="p-2">
            <div className="d-flex ">
              <div className="p-2 ml-auto ">
                <div className="d-flex justify-content-start align-items-center">
                  <Button
                    style={{ width: "60px", borderRadius: "50px" }}
                    onClick={this.props.openaddUser}
                  >
                    <AddCircleOutlineOutlinedIcon
                      style={{ color: orange[500], width: 100 }}
                    />
                  </Button>
                  <div style={{ fontSize: "30px", color: "orange" }}>
                    <IntlMessages id="add.user" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table "
            style={{ borderCollapse: "separate", borderSpacing: "0 15px" }}
          >
            <thead>
              <tr style={{ paddingBottom: "10px", textAlign: "start" }}>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="user.photo" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="user.name" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="user.last.name" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="user.role" />{" "}
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="user.mail" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="user.phone.number" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <UserListItem
                  photo={row.photo}
                  nom={row.nom}
                  prenom={row.prenom}
                  role={row.role}
                  email={row.email}
                  Ntel={row.Ntel}
                  opendetailsUser={this.opendetailsUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
