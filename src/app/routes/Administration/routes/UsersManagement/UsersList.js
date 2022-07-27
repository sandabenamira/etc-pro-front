import React, { useState } from "react";
import UserListItem from "./UserListItem";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { orange } from "@material-ui/core/colors";
import IntlMessages from "../../../../../util/IntlMessages";
import AddUser from "./AddUser";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import styles from "../../../Learning/routes/OnlineTraining/styles.module.css";
import { roleList } from "../../../../../constants/variables and listes";

export default function UsersList(props) {
  const [openadd, setOpenadd] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [radio, setRadio] = useState("");
  const openaddUser = () => {
    setOpenadd(!openadd);
  };
  const data = props.data;
  const handleChange = (value, label) => {
    props.setFilter({
      label,
      value,
    });
  };
  const toggleDropDown = () => {
    setDropDownIsOpen((prevState) => !prevState);
  };

  return (
    <div className="app-wrapper ">
      {openadd && <AddUser openUser={openaddUser} />}

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

        <div className="p-2">
          <div className="d-flex ">
            <div className="p-2 ml-auto ">
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  style={{ width: "400px", borderRadius: "50px" }}
                  onClick={openaddUser}
                >
                  <AddCircleOutlineOutlinedIcon
                    style={{ color: orange[500], marginRight: "20px" }}
                  />
                  <div
                    style={{
                      fontSize: "25px",
                      color: "orange",
                      marginRight: "40px",
                      textTransform: "none",
                    }}
                  >
                    <IntlMessages id="add.user" />
                  </div>
                </Button>
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
            {radio !== "" &&
              data
                .filter((e) => e.name === props.filter.value)
                .filter((e) => e.isArchived === false)
                .map((row, i) => <UserListItem key={i} data={row} />)}

            {radio === "" &&
              data
                 .filter((e) => e.isArchived === false)
                .map((row, i) => <UserListItem key={i} data={row} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
