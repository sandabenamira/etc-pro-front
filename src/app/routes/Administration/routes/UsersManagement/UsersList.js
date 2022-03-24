import React, { useState } from "react";

import UserListItem from "./UserListItem";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useEffect } from "react";

import { orange } from "@material-ui/core/colors";

import IntlMessages from "../../../../../util/IntlMessages";
import Select from "react-select";
import AddUser from "./AddUser";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { getUsers } from "../../../../../store/actions/User";
import { useDispatch, useSelector } from "react-redux";

export default function UsersList() {
  const [openadd, setOpenadd] = useState(false);
  const openaddUser = () => {
    setOpenadd(!openadd);
  };

  const listRoles = [
    {
      id: 0,
      label: "Administrateur",
      value: 0,
    },
    {
      id: 1,
      label: "Directeurs des Ressouces Humaines",
      value: 1,
    },
    {
      id: 2,
      label: "Responsable des Formations",
      value: 2,
    },
    {
      id: 3,
      label: "Chef D'agences",
      value: 3,
    },
    {
      id: 4,
      label: "Formateurs",
      value: 4,
    },
    {
      id: 5,
      label: "Collaborateurs",
      value: 5,
    },
  ];
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(getUsers());
    console.log("get users : ", getUsers());
  }, []);

  const handleChangeRole = (selectedOption) => {};

  return (
    <div className="app-wrapper ">
      {openadd && <AddUser openaddUser={openaddUser} />}

      <div className="d-flex justify-content-around bd-highlight flex-wrap">
        <div className="p-2">
          <Select
            required
            options={listRoles}
            onChange={handleChangeRole}
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

        <div className="p-2">
          <div className="d-flex ">
            <div className="p-2 ml-auto ">
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  style={{ width: "60px", borderRadius: "50px" }}
                  onClick={openaddUser}
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
          style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}
        >
          <thead>
            <tr style={{ paddingBottom: "10px", textAlign: "center" }}>
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
                <IntlMessages id="user.role" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="user.mail" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <UserListItem key={i} data={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
