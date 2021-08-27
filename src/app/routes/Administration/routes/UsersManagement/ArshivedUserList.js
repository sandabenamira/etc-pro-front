import React, { Component } from "react";

import ArshivedUserItems from "./ArshivedUserItems";

import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import IntlMessages from "../../../../../util/IntlMessages";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

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
  render() {
    return (
      <div className="app-wrapper ">
        <div className="d-flex flex-row col-lg-12 col-md-12  col-sm-12 justify-content-around">

        <div className="d-flex ">
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
          </div>
          <div className=" d-flex flex-row flex-wrap p-2 col-lg-4 col-md-3  col-sm-3 justify-content-center">
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
        
        </div>
        <table
          className="table"
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
              <ArshivedUserItems
                photo={row.photo}
                nom={row.nom}
                prenom={row.prenom}
                role={row.role}
                email={row.email}
                Ntel={row.Ntel}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
