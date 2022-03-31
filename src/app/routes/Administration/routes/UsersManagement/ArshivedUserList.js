import React, { useState, useEffect } from "react";
import { getUsers } from "../../../../../store/actions/User";
import { useDispatch, useSelector } from "react-redux";
import ArshivedUserItems from "./ArshivedUserItems";

import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../../util/IntlMessages";
import Select from "react-select";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

export default function ArshivedUserList(props) {
  const [filter, setFilter] = useState({
    label: "Administrateur",
    value: "Administrateur",
  });
  const roleList = [
    {
      id: 0,
      label: "Administrateur",
      value: "Administrateur",
    },
    {
      id: 1,
      label: "Directeurs des Ressouces Humaines",
      value: "Directeurs des Ressouces Humaines",
    },
    {
      id: 2,
      label: "Responsable des Formations",
      value: "Responsable des Formations",
    },
    {
      id: 3,
      label: "Chef D'agences",
      value: "Chef D'agences",
    },
    {
      id: 4,
      label: "Formateurs",
      value: "Formateurs",
    },
    {
      id: 5,
      label: "Collaborateurs",
      value: "Collaborateurs",
    },
  ];

  const data = props.data;
  return (
    <div className="app-wrapper ">
      <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12 bd-highlight flex-wrap"></div>

      <div className="d-flex justify-content-around bd-highlight flex-wrap">
        <div className="p-2">
          {/* <Button
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
          </Button> */}

          <Select
            required
            options={roleList}
            onChange={(e) => setFilter(e)}
            value={filter}
            id="role"
            name="role"
            styles={{
              control: (base) => ({
                ...base,
                "&:hover": { borderColor: "gray" }, // border style on hover
                border: "1px solid lightgray", // default border color
                boxShadow: "none", // no box-shadow
                borderTopStyle: "none",
                borderRightStyle: "none",
                borderLeftStyle: "none",
                borderRadius: " none",
                width: 200,
              }),
            }}
          />
        </div>

        <div className=" d-flex flex-column flex-wrap p-2 col-lg-4 col-md-6  col-sm-12 justify-content-center">
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
              <SearchIcon style={{ marginRight: "-100%", color: "#565C79" }} />
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
      <div className="table-responsive">
        <table
          className="table "
          style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}
        >
          <thead>
            <tr
              style={{
                paddingBottom: "10px",
                textAlign: "center"
              }}
            >
              <th
                style={{
                  borderBottom: "0",
                  borderTop: "0",
                  textAlign: "start",
                }}
              >
                <IntlMessages id="user.photo" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="user.name" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="user.last.name" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="user.role" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="user.mail" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                Numéro de téléphone
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((e) => e.archive === true)
              .filter((e) => e.role === filter.value)

              .map((row, i) => (
                <ArshivedUserItems
                  key={i}
                  data={row}
                  increment={props.increment}
                  count={props.count}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
