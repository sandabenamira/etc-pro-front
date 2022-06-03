import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";
import OnlineTrainingItem from "./OnlineTrainingItem";
import SearchIcon from "@material-ui/icons/Search";
import IntlMessages from "../../../../../util/IntlMessages";
// import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@mui/material/InputLabel";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BootstrapInput from "./CostumInput";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import styles from "./styles.module.css";

export default function OnlineTrainingList(props) {
  const [filter, setFilter] = useState({
    id: 1,
    label: "Plus récent",
    value: "Plus récent",
  });

  const handleChange = (value, label) => {
    setFilter({
      label,
      value,
    });
  };

  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const toggleDropDown = () => {
    setDropDownIsOpen((prevState) => !prevState);
  };

  const typeList = [
    { id: 1, label: "Plus récent", value: "Plus récent" },
    { id: 2, label: "Favoris", value: "Favoris" },
    { id: 3, label: "Inscription", value: "Inscription" },
  ];
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row flex-wrap">
        <div className="p-2 col-md-3 col-sm-3 col-lg-2">
          <Dropdown isOpen={dropDownIsOpen} toggle={toggleDropDown}>
            <DropdownToggle caret className={styles.container}>
              Filtrer par
            </DropdownToggle>
            <DropdownMenu>
              {typeList.map((option, index) => (
                <div
                  className="d-flex flex-column m-2"
                  key={index}
                  onClick={() => handleChange(option.label, option.value)}
                >
                  <label>
                    <input
                      type="radio"
                      name="radio"
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
        <div className="p-2  col-md-5 col-sm-5 col-lg-5 justify-content-end">
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
        <div className="p-2 ml-auto">
          <div className="d-flex justify-content-end align-items-end">
            <Button
              style={{ width: "100%", borderRadius: "50px" }}
              onClick={props.openAddTraining}
            >
              <AddCircleOutlineOutlinedIcon
                style={{ color: orange[500], marginRight: "20px" }}
              />
              <div
                style={{
                  fontSize: "25px",
                  color: "orange",
                  textTransform: "none",
                }}
              >
                <IntlMessages id="add.formation" />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <br />
      <div className="p-2 price-tables row pt-default d-flex justify-content-start ">
        {[1, 2, 3, 4]
          // .filter((e) => e.type === filter.value)
          .map((element, index) => (
            <div className="col-md-6 col-lg-3 col-sm-6 " key={index}>
              <OnlineTrainingItem key={index} />
            </div>
          ))}
      </div>
    </div>
  );
}
