import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";


export default class AddTrainingMaterial extends Component {
  render() {
    const { values } = this.props;

    return (
      <div className="app-wrapper">
        <Modal isOpen={values.isOpen}>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              onSubmit={this.props.handleSubmit}
            >
              <div className="d-flex flex-column ml-5 ">
                <div
                  className="d-flex justify-content-center mt-3"
                  style={{ color: "#4C25B7", fontSize: "25px" }}
                >
                  Ajouter un support de formation
                </div>
                <br /><br />

                {/* Ajout d'un support de formation */}
                <div className="p-2 d-flex flex-row ">
                  <div className="p-2  d-flex flex-column col-md-6 ">
                    <div style={{  fontSize: "18px" }}>
                      Sujet
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        id="descriptionTraining"
                        onChange={this.props.handleChange("descriptionTraining")}
                        value={values.descriptionTraining}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      >
                      </TextField>
                    </div>
                  </div>
                  <div className="p-2  d-flex flex-column col-md-6 ">
                    <div style={{  fontSize: "18px" }}>
                      Associer à une formation
                    </div>
                    <div>
                    <TextField
                      className="textfield"
                      id="userId"
                      onChange={this.props.handleChange("userId")}
                      select
                      value={values.userId}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    >
                      {this.props.users.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.firstName} {item.lastName}
                          </MenuItem>
                        ))}
                    </TextField>
                  </div>
                  
                </div>
                </div>
                <div className="p-2 d-flex flex-row">
                <div className="p-2 flex-column col-md-6">
                  <div
                    className="p-2"
                    style={{  fontSize: "18px" }}
                  >
                    Destinés aux
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="theme"
                      onChange={this.props.handleChange("theme")}
                      value={values.themeId}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                </div>
                <div className="p-2 d-flex flex-row">
                <div className="p-2 flex-column col-md-6">
                  <div
                    className="p-2"
                    style={{  fontSize: "18px" }}
                  >
                    Description
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="theme"
                      onChange={this.props.handleChange("theme")}
                      value={values.themeId}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                </div>
                <div className="p-2 d-flex flex-row">
                <div className="p-2 flex-column col-md-6">
                  <div
                    className="p-2"
                    style={{  fontSize: "18px" }}
                  >
                   Joindre un fichier
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="theme"
                      onChange={this.props.handleChange("theme")}
                      value={values.themeId}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                </div>
                
              
                {/* format formation */}

                <div className="p-2 d-flex flex-row">
                  <div
                    className="p-2"
                    style={{ fontSize: "18px" }}
                  >
                    Joindre un fichier
                  </div>
                  <div className="ml-5">
                    <RadioGroup
                      className="d-flex flex-row"
                      aria-label="trainingFormat"
                      name="trainingFormat"
                      value={values.trainingFormat}
                      onChange={this.props.handleChange("trainingFormat")}
                    >
                      <FormControlLabel
                        value="INLINE"
                        control={<Radio color="primary" />}
                        label="En ligne"
                      />

                      <FormControlLabel
                        value="FACETOFACE"
                        control={<Radio color="primary" />}
                        label="Présentiel"
                      />
                      <FormControlLabel
                        value="HYBRID"
                        control={<Radio color="primary" />}
                        label="Hybride"
                      />
                    </RadioGroup>
                  </div>
                </div>
               
                {/* les bouttons */}
                <div className="p-2 d-flex flex-row justify-content-center">
                  <div className="p-2">
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ borderRadius: "80px" }}
                      onClick={this.props.handleCancel}
                    >
                      Annuler
                    </Button>
                  </div>
                  <div className="p-2 ml-3">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "80px" }}
                      type="submit"
                    >
                      Confirmer
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
}
