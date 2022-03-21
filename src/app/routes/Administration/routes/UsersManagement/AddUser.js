import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { orange } from "@material-ui/core/colors";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import AttachmentIcon from "@material-ui/icons/Attachment";

export default function AddUser(props) {
  // const { values } = props;
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [genre, setGenre] = useState();
  const [date_naissance, setDate_naissance] = useState();
  const [pays, setPays] = useState();
  const [adresse_postale, setAdresse_postale] = useState();
  const [code_postale, setCode_postale] = useState();
  const [photo, setPhoto] = useState();
  const [role, setRole] = useState();
  const [identifiant, setIdentifiant] = useState();
  const [agency, setAgency] = useState();
  const [papier, setPapier] = useState();
  const choisirGenre = (e) => {
    if (e === "male") {
      setGenre("masculin");
    } else setGenre("féminin");
  };
  var today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalData = {
      "nom": nom,
      "prenom":prenom,
      "genre": genre,
      "dateNaissance": date_naissance,
    //  "numeroTelephone": pays,
   //   "email": "string",
      "password": "string",
      "adressePostale": "string",
      "identifiant": "string",
      "pieceJointe": "string",
      "createdIn": new Date(),
      "createdBy": 0,
      "modifiedBy": 0,
      "mdifiedIn": new Date(),
    //  "deletedIn": "2022-03-21T09:20:41.513Z",
     // "lastLogin": "2022-03-21T09:20:41.513Z",
      "role": "string"
    };}
  return (
    <div className="app-wrapper">
      <Modal isOpen={props.openaddUser}>
        <ModalBody>
          <form
            className="row"
            autoComplete="off"
            onSubmit={props.handleSubmit}
          >
            <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-12 col-sm-12">
              <div
                className="d-flex align-item-center justify-content-center "
                style={{ color: "#4C25B7", fontSize: "25px" }}
              >
                <IntlMessages id="add.user" />
              </div>
              <br />
              <br />

              {/* Add caract */}
              <div className="p-2 d-flex flex-row ">
                <div className="p-2 d-flex flex-column flex-wrap col-md-4">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.name" />
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
                <div className="p-2 d-flex flex-wrap flex-column col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.last.name" />
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={(e) => setPrenom(e.target.value)}
                      value={prenom}
                    ></TextField>
                  </div>
                </div>
                <div className=" d-flex flex-row flex-wrap bd-highlight col-md-4 ">
                  <div className="p-2" style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.genre" />

                    <div className="">
                      <RadioGroup className=" d-flex flex-row">
                        <FormControlLabel
                          value="male"
                          control={
                            <Radio
                              color="primary"
                              checked={genre === "male"}
                              onChange={choisirGenre}
                            />
                          }
                        />

                        <i
                          className="zmdi zmdi-male-alt zmdi-hc-3x"
                          style={{ color: "blue" }}
                        ></i>
                        <FormControlLabel
                          value="female"
                          control={
                            <Radio
                              checked={genre === "female"}
                              onChange={choisirGenre}
                              color="primary"
                            />
                          }
                        />
                        <i
                          className="zmdi zmdi-female zmdi-hc-3x"
                          style={{ color: "orange" }}
                        ></i>
                      </RadioGroup>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              {/* Add date */}
              <div className="p-2 d-flex flex-wrap flex-row ">
                <div className=" p-3 d-flex flex-column col-md-5 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.birthday.date" />
                    <TextField
                      id="date"
                      type="date"
                     // defaultValue="2017-05-24"
                      //className={classes.textField}
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      onChange={(e) => setDate_naissance(e.target.value)}
                      value={date_naissance}
                    />
                  </div>

                  <div></div>
                </div>
                <div className=" p-1 d-flex flex-column col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="country.user" />
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      select
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={(e) => setPays(e.target.value)}
                      value={pays}
                    ></TextField>
                  </div>
                </div>
              </div>

              {/* Add contact */}
              <div className="p-2 d-flex flex-wrap flex-row ">
                <div className="p-2 d-flex flex-column col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.address.postal" />
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={(e) => setAdresse_postale(e.target.value)}
                      value={adresse_postale}
                    ></TextField>
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="zip.code.user" />
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={(e) => setCode_postale(e.target.value)}
                      value={code_postale}
                    ></TextField>
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "20px", color: "orange" }}>
                    <AddCircleOutlineOutlinedIcon
                      style={{ color: orange[500] }}
                    />

                    <IntlMessages id="add.picture" />
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex flex-wrap flex-row ">
                <div className="p-2 d-flex flex-column col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.role" />
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      select
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                    ></TextField>
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.identifiant" />
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={(e) => setIdentifiant(e.target.value)}
                      value={identifiant}
                    ></TextField>
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="agency" />
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      select
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={(e) => setAgency(e.target.value)}
                      value={agency}
                    ></TextField>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex flex-wrap flex-row">
                <div className="p-2" style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.join.papiers" />
                </div>
                <div className="ml-5">
                  <Button
                    variant="contained"
                    color="default"
                    style={{ borderRadius: "80px", fontWeight: "bold" }}
                    startIcon={<AttachmentIcon />}
                    onChange={(e) => setPapier(e.target.value)}
                    value={papier}
                  >
                    <IntlMessages id="message.attach.file" />
                  </Button>
                </div>
              </div>

              {/* butons */}
              <div className="p-2 d-flex flex-row  flex-wrap justify-content-center">
                <div className="p-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ borderRadius: "80px" }}
                    //  onClick={props.handleCancel}
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
    </div>
  );
}