import React, { useState } from "react";
import ArshivedUserItems from "./ArshivedUserItems";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../../util/IntlMessages";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import styles from "../../../Learning/routes/OnlineTraining/styles.module.css";

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

  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const toggleDropDown = () => {
    setDropDownIsOpen((prevState) => !prevState);
  };
  const handleChange = (value, label) => {
    setFilter({
      label,
      value,
    });
  };
  return (
    <div className="app-wrapper ">
      <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12 bd-highlight flex-wrap"></div>

      <div className="d-flex justify-content-around bd-highlight flex-wrap">
        <div className="p-2">
          <Dropdown isOpen={dropDownIsOpen} toggle={toggleDropDown}>
            <DropdownToggle caret className={styles.container}>
              Tous les rôles
            </DropdownToggle>
            <DropdownMenu>
              {roleList.map((option, index) => (
                <div
                  className="d-flex flex-column m-2"
                  key={index}
                  onClick={() => {
                    handleChange(option.label, option.value);
                  }}
                >
                  <label>
                    <input
                      type="radio"
                      name="radio" //il faut avoir la même name
                      value={option.value}
                      className="mr-2"
                    />

                    {option.label}
                  </label>
                </div>
              ))}
            </DropdownMenu>
          </Dropdown>
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
              borderColor: "#3f51b5",
              height: "40px",
            }}
          >
            <IconButton aria-label="search">
              <SearchIcon
                style={{
                  marginRight: "-100%",
                  color: "#565C79",
                  transform: "scaleX(-1)",
                }}
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
      <div className="table-responsive">
        <table
          className="table "
          style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}
        >
          <thead>
            <tr
              style={{
                paddingBottom: "10px",
                textAlign: "center",
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
              .filter((e) => e.isArchived === true)
              .filter((e) => e.name === filter.value)
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
