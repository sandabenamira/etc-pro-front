import React from "react";
 import IconButton from "@material-ui/core/IconButton";
import EntrepriseItem from "./EntrepriseItem";
 import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect } from "react";
import { getEntreprises } from "../../../../../store/actions/Entreprise";
import { useDispatch, useSelector } from "react-redux";

export default function Entreprise(props) {
  let dispatch = useDispatch();
  const data = useSelector((state) => state.Entreprise.entreprises);

  useEffect(() => {
    dispatch(getEntreprises());
  }, [dispatch]);

 
  return (
    <div>
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12 bd-highlight flex-wrap"></div>

        <div className="d-flex justify-content-around bd-highlight flex-wrap">
         
        <div className="p-2">
            
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
              //    position:"fixed"
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
                  Gouvernorat
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>Pays</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Numéro Téléphone
                </th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>Créer en</th>

                {/* <th style={{ borderBottom: "0", borderTop: "0" }}>
               
                Confirmer
              </th> */}
                <th style={{ borderBottom: "0", borderTop: "0" }}>Actions</th>
              </tr>
            </thead>
            {/* //key={person.id} */}
            <tbody>
              {data.map((row, index) => (
                <EntrepriseItem key={index} data={row} />
              ))}
            </tbody>
          </table>
        </div>

        
      </div>
    </div>
  );
}
