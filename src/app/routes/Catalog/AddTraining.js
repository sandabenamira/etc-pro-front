import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DateRangeComponent from "./DateRangeComponent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from '@material-ui/core/Button';


export default class AddTraining extends Component {
  render() {
    const { values } = this.props;
    return (
      <div className="app-wrapper">
        <Modal isOpen={values.isOpen}>
          <ModalHeader
          //   toggle={this.handleCancel}
          // className="modal-box-header "
          >
            <div style={{ textAlign: "center" }}>Ajouter une formation</div>
          </ModalHeader>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              //   onSubmit={this.handleSubmit}
            >
              <div className="d-flex flex-column ml-5 ">
                <div className="p-2 ">
                  <h2>Informations générales</h2>
                </div>
                {/* thème formation */}
                <div className="p-2 flex-column">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Thème de la formation *
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="level_id"
                      //   onChange={this.props.handleChangeLevel(
                      //     "level_id"
                      //   )}
                      select
                      //   value={this.props.values.level_id}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    >
                      {[
                        { id: 1, name: "Design thinking" },
                        { id: 2, name: "Loopback 4" },
                        { id: 3, name: "React js" },
                      ].map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>

                {/* session */}
                <div className="p-2 flex-column">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Ajouter une session
                  </div>
                  <div className="p-2">
                    <DateRangeComponent />
                  </div>

                  <div className="p-2">
                    <DateRangeComponent />
                  </div>
                </div>
                {/* add modules */}
                <div className="p-2 flex-column">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Ajouter un module
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="level_id"
                      //   onChange={this.props.handleChangeLevel(
                      //     "level_id"
                      //   )}
                      select
                      //   value={this.props.values.level_id}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    >
                      {[
                        { id: 1, name: "Design thinking" },
                        { id: 2, name: "Loopback 4" },
                        { id: 3, name: "React js" },
                      ].map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>

                {/* add level */}
                <div className="p-2 d-flex flex-row">
                  <div className="p-2 flex-column">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Ajouter un niveau
                    </div>
                    <div className="p-2">
                      <TextField
                        className="textfield"
                        id="level_id"
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>

                  <div className="p-2 flex-column">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Associer à un module
                    </div>
                    <div className="p-2">
                      <TextField
                        className="textfield"
                        id="level_id"
                        select
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      >
                        {[
                          { id: 1, name: "Design thinking" },
                          { id: 2, name: "Loopback 4" },
                          { id: 3, name: "React js" },
                        ].map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                {/* certificat */}
                <div className="p-2 d-flex flex-row">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Existe-t-il une certification ? *
                  </div>
                  <div className="ml-5">
                    <RadioGroup
                      className="d-flex flex-row"
                      aria-label="conferenceTool"
                      name="conferenceTool"
                      //   value={values.conferenceTool}
                      //   onChange={this.props.handleChange("conferenceTool")}
                    >
                      <FormControlLabel
                        value="JITSI"
                        control={<Radio color="primary" />}
                        label="Oui"
                      />

                      <FormControlLabel
                        value="BBB"
                        control={<Radio color="primary" />}
                        label="Non"
                      />
                    </RadioGroup>
                  </div>
                </div>
                {/* format formation */}

                <div className="p-2 d-flex flex-row">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Qu'elle est le format de la formation ? *
                  </div>
                  <div className="ml-5">
                    <RadioGroup
                      className="d-flex flex-row"
                      aria-label="conferenceTool"
                      name="conferenceTool"
                      //   value={values.conferenceTool}
                      //   onChange={this.props.handleChange("conferenceTool")}
                    >
                      <FormControlLabel
                        value="JITSI"
                        control={<Radio color="primary" />}
                        label="En ligne"
                      />

                      <FormControlLabel
                        value="BBB"
                        control={<Radio color="primary" />}
                        label="Présentiel"
                      />
                      <FormControlLabel
                        value="BBB"
                        control={<Radio color="Hybride" />}
                        label="Non"
                      />
                    </RadioGroup>
                  </div>
                </div>
                {/* titre formation */}
                <div className="p-2  d-flex flex-column">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Titre de la formation *
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="level_id"
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>

                {/* description formation */}
                <div className="p-2  d-flex flex-column">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Description
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="level_id"
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                {/* lieu formation */}
                <div className="p-2  d-flex flex-column">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Lieu de la formation
                  </div>
                  <div className="p-2">
                    <TextField
                      className="textfield"
                      id="level_id"
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                {/* formateur & description */}
                <div className="p-2 d-flex flex-row">
                  <div className="p-2  d-flex flex-column ">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Formateur *
                    </div>
                    <div className="p-2 ">
                      <TextField
                        className="textfield"
                        id="level_id"
                        //   onChange={this.props.handleChangeLevel(
                        //     "level_id"
                        //   )}
                        select
                        //   value={this.props.values.level_id}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      >
                        {[
                          { id: 1, name: "Design thinking" },
                          { id: 2, name: "Loopback 4" },
                          { id: 3, name: "React js" },
                        ].map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="p-2  d-flex flex-column ml-4">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Description
                    </div>

                    <div className="p-2">
                      <TextField
                        className="textfield"
                        id="level_id"
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                </div>

                {/* objectif & methodologie */}
                <div className="p-2 d-flex flex-row">
                  <div className="p-2  d-flex flex-column ">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Objectif de la formation
                    </div>
                    <div className="p-2 ">
                      <TextField
                        className="textfield"
                        id="level_id"
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>

                  <div className="p-2  d-flex flex-column ml-4">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Méthodologie
                    </div>

                    <div className="p-2">
                      <TextField
                        className="textfield"
                        id="level_id"
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                </div>
                {/* prérequis */}
                <div className="p-2  d-flex flex-column ">
                  <div
                    className="p-2 "
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    Prérequis
                  </div>
                  <div className="p-2 ">
                    <TextField
                      className="textfield"
                      id="level_id"
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                {/* Programmes */}

                <div className="p-2 ">
                  <h2>Programme</h2>
                </div>
                {/* nombre de jours */}
                <div className=" d-flex flex-row ">
                  <div
                    className="p-4 "
                    style={{ color: "#4C25B7", fontSize: "16px" }}
                  >
                    nombres de jours
                  </div>
                  <div className="ml-5 ">
                    <TextField
                      className="textfield"
                      id="level_id"
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                <div className="p-2 d-flex flex-row">
                  {/* <div className="mr-3 mt-4"> */}
                  {/* <LensOutlinedIcon
                      style={{ fontSize: 130, color: "orange" }}
                      shapeRendering="yess"
                    />*/}

                  <div className="max-width-100">
                    <CircularProgressbar
                      percentage="100"
                      text="hhhh"
                      styles={{
                        path: { stroke: "orange", height: "100%" },
                        text: { fill: "#3D3D3D", fontSize: "16px" },
                      }}
                    />
                  </div>

                  <div className="p-2 d-flex flex-column">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Titre
                    </div>
                    <div className="p-2 ">
                      <TextField
                        className="textfield"
                        id="level_id"
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>

                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "16px" }}
                    >
                      Description
                    </div>
                    <div className="p-2 ">
                      <TextField
                        className="textfield"
                        id="level_id"
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                </div>

                {/* prix */}
                <div className="p-2 d-flex flex-column">
                  <h2>Prix de la formation par personne *</h2>

                  <div className="p-2 ">
                    <TextField
                      className="textfield"
                      id="level_id"
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                {/* les bouttons */}
                <div className="p-2 d-flex flex-row justify-content-center">
                    <div className="p-2">
                    <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    style={{borderRadius:"80px"}}
               
                  >
                    Annuler
                  </Button>
                    </div>
                  <div className="p-2 ml-3">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    style={{borderRadius:"80px"}}
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
