import { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import InscriptionItem from "./InscriptionItem";

import Select from "react-select";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect } from "react";
import { getInscriptions } from "../../../../../store/actions/Inscription";
import { useDispatch, useSelector } from "react-redux";


function Inscription(props) {
  let dispatch = useDispatch();
  const data = useSelector((state) => state.Inscriptions.inscriptions);
  console.log("this my useSelector", data);
  useEffect(() => {
    dispatch(getInscriptions());
    console.log("this my useEffect", dispatch(getInscriptions()));
  }, []);

  const [opendetails, setOpendetails] = useState(false);
  const [handleClick, setHandleClick] = useState(0);

  console.log("this my opendetails:", opendetails);
  console.log(handleClick);

  const [filter, setFilter] = useState("");

  return (
    <div>
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12 bd-highlight flex-wrap"></div>

        <div className="d-flex justify-content-around bd-highlight flex-wrap">
          <div className="p-2">
            <Select
              required
              options={filter}
              onChange={setFilter}
              id="role"
              name="role"
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
        <div className="table-responsive">
          <table
            className="table"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 30px",
              width: "100%",
            }}
          >
            <thead className="">
              <tr style={{ paddingBottom: "10px", textAlign: "center" }}>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Nom Entreprise
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Numéro série
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Adresse de la société
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Code postal
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Gouvernorat
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>pays</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  numero Telephone
                </th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>created In</th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>nom user</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>prenom User</th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  addresse User
                </th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Email User
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                 
                  Confirmer
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>boutons</th>
              </tr>
            </thead>
            {/* //key={person.id} */}
            <tbody>
              {data.map((row, index) => (
                <InscriptionItem key={index} data={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default (Inscription);
