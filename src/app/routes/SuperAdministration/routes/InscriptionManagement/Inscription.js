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

function Inscription() {
  let dispatch = useDispatch();
  const data = useSelector((state) => state.Inscriptions.inscriptions);
  useEffect(() => {
    dispatch(getInscriptions());
  }, [dispatch]);
 
  const [filter, setFilter] = useState({
    label: "En attente",
    value: "en attente",
  });

  return (
    <div>
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12 bd-highlight flex-wrap"></div>

        <div className="d-flex justify-content-around bd-highlight flex-wrap">
          <div className="p-2">
            <Select
              required
              options={[
                { label: "Confirmé", value: "confirmé" },
                { label: "En attente", value: "en attente" },
                { label: "Refusé", value: "refusé" },
              ]}
               onChange={(e) => setFilter(e)}
              id="statut"
              name="statut"
              value={filter}
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
                  Gouvernorat
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>Pays</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Numéro Téléphone
                </th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>Créer en</th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>status</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((e) => e.status === filter.value)
                .map((row, index) => (
                  <InscriptionItem key={index} data={row} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
