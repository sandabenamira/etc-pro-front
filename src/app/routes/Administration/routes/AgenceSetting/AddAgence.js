import { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import { addAgence } from "../../../../../store/actions/Agence";
import MenuItem from "@mui/material/MenuItem";

export default function AddAgence(props) {
  let dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [gouvernorat, setGouvernorat] = useState("");
  const [fax, setFax] = useState();
  const [numeroTel, setNumeroTel] = useState();
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalData = {
      nom: nom,
      type: type,
      gouvernorat: gouvernorat,
      adresse: adresse,
      email: email,
      fax: parseInt(fax),
      numeroTel: parseInt(numeroTel),

      archive: false,
    };

    dispatch(addAgence(finalData));
  };
  const handleCancel = (e) => {
    setNom("");
    setType("");
    setGouvernorat("");
    setFax("");
    setNumeroTel("");
    setEmail("");
  };
  const typeList = [
    {
      value: "BIAT Sousse",
      label: "BIAT Sousse",
    },
    {
      value: "BIAT Sfax",
      label: "BIAT Sfax",
    },
    {
      value: "BIAT Tunis",
      label: "BIAT Tunis",
    },
  ];

  const gouvernoratList = [
    {
      value: "Sousse",
      label: " Sousse",
    },
    {
      value: " Sfax",
      label: " Sfax",
    },
    {
      value: "Tunis",
      label: " Tunis",
    },
  ];
  return (
    <Modal isOpen={props.openaddAgence}>
      <ModalBody>
        <form className="row" autoComplete="off">
          <div className="d-flex flex-column col-lg-12 col-md-12 ">
            <div
              className="d-flex justify-content-end mt-2 "
              style={{
                color: "#4C25B7",
                fontSize: "25px",
              }}
            >
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={props.openaddAgence}
                style={{
                  marginTop: "-2%",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="d-flex flex-row justify-content-center ">
              <div
                className="d-flex justify-content-center  col-lg-11 col-md-11 col-sm-11"
                style={{ color: "#4C25B7", fontSize: "25px" }}
              >
                <IntlMessages id="gestion.agence.add.agency" />
              </div>

              <br />
              <br />
            </div>
            <div className="p-2 d-flex flex-row ">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.agency" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                    required
                  ></TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-column col-md-6 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.agency.type" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    select
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    required
                  >
                    {typeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>

            <div className="p-2 d-flex flex-row ">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.address" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={(e) => setAdresse(e.target.value)}
                    value={adresse}
                    required
                  ></TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-column col-md-6 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.governorate" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    select
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    onChange={(e) => setGouvernorat(e.target.value)}
                    value={gouvernorat}
                  >
                    {gouvernoratList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>

            <div className="p-2 d-flex flex-row">
              <div className="p-2 flex-column col-lg-10 col-md-10">
                <div className="p-2" style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.mail" />
                </div>
                <div className="p-2">
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></TextField>
                </div>
              </div>
            </div>

            <div className="p-2 d-flex flex-row ">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.fax" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    onChange={(e) => setFax(e.target.value)}
                    value={fax}
                  ></TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-column col-md-6 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.tel" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    required
                    onChange={(e) => setNumeroTel(e.target.value)}
                    value={numeroTel}
                    size="small"
                  ></TextField>
                </div>
              </div>
            </div>

            <div className="p-2 d-flex flex-row justify-content-center">
              <div className="p-2">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ borderRadius: "80px" }}
                  onClick={handleCancel}
                >
                  <IntlMessages id="cancel" />
                </Button>
              </div>
              <div className="p-2 ml-3">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "80px" }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  <IntlMessages id="confirm" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
