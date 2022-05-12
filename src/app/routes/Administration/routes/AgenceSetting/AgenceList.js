import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";
import AgenceItems from "./AgenceItem";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IntlMessages from "../../../../../util/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAgences } from "../../../../../store/actions/Agence";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import Button from "@material-ui/core/Button";
import AddAgence from "./AddAgence";

export default function AgenceList() {
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
  const dispatch = useDispatch();
 
  const [openadd, setOpenadd] = useState(false);

  const openaddAgence = () => {
    setOpenadd(!openadd);
  };
  const data = useSelector((state) => state.Agences.agences);
  useEffect(() => {
    dispatch(getAgences());
   }, []);

  return (
    <div className="app-wrapper ">
      {openadd && <AddAgence openaddAgence={openaddAgence} />}

      <div className="d-flex flex-column">
        <div className="d-flex justify-content-around bd-highlight flex-wrap">
          <div className="p-2">
          <Select
            required
            options={roleList}
         //   onChange={(e) => setFilter(e)}
        //    value={filter}
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
                height: "50px",
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
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    style={{ width: "400px", borderRadius: "50px" }}
                    onClick={openaddAgence}
                  >
                    <AddCircleOutlineOutlinedIcon
                      style={{ color: orange[500] ,marginRight:"20px"}}
                    />
                    <div
                      style={{
                        fontSize: "25px",
                        color: "orange",
                        marginRight: "40px",
                        textTransform: "none",
                      }}
                    >
                      <IntlMessages id="gestion.agence.add.agency" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
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
              {data.map((row) => (
                <AgenceItems data={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
