/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ArchiveItem from "./ArchiveItem";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../../util/IntlMessages";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import styles from "../../../Learning/routes/OnlineTraining/styles.module.css";
import { typeList } from "../../../../../constants/variables and listes";

export default function ArchiveList(props) {
  const [filter, setFilter] = useState({});
  console.log("dddddd",filter)
  const [radio, setRadio] = useState("");
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const data = props.data;
  const handleChange = (value, label) => {
    setFilter({
      label,
      value,
    });
  };
  const toggleDropDown = () => {
    setDropDownIsOpen((prevState) => !prevState);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-around bd-highlight flex-wrap">
        <div className="p-2">
          <Dropdown isOpen={dropDownIsOpen} toggle={toggleDropDown}>
            <DropdownToggle caret className={styles.container}>
              Tous les gouvernerats
            </DropdownToggle>
            <DropdownMenu>
              {typeList.map((option, index) => (
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
                      name="radio" //il faut avoir le même name
                      value={option.value}
                      className="mr-2"
                      checked={radio === option.value}
                      onChange={(e) => {
                        setRadio(e.target.value);
                      }}
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
      <br />
      <div class="table-responsive">
        <table
          className="table"
          style={{ borderCollapse: "separate", borderSpacing: "0 15px" }}
        >
          <thead>
            <tr style={{ paddingBottom: "10px", textAlign: "center" }}>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="gestion.agence.agency" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="gestion.agence.type" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="gestion.agence.governorate" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="gestion.agence.address" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="gestion.agence.mail" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="gestion.agence.fax" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="gestion.agence.tel" />
              </th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {radio === "" &&
              data
                .filter((e) => e.isArchived === true)
                .map((row, index) => (
                  <ArchiveItem data={row} key={index} />
                ))}{" "}
            {radio !== "" &&
              data
                .filter((e) => e.isArchived === true)
                .filter((e) => e.type === filter.value)
                .map((row, index) => <ArchiveItem data={row} key={index} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
