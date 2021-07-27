import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DateRangeComponent from "./DateRangeComponent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";

export default class AddTraining extends Component {
  render() {
    const { values } = this.props;
    return (
      <div className="app-wrapper">
        <Modal isOpen={values.isOpen}>
    
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              //   onSubmit={this.handleSubmit}
            >
              <div className="d-flex flex-column ml-5 ">
                <div
                  className="d-flex justify-content-center mt-3"
                  style={{ color: "#4C25B7", fontSize: "25px" }}
                >
                  Ajouter une formation
                </div>

                <br />
                <br />

                <div className="p-2 " style={{ fontSize: "20px" }}>
                  <b>Informations générales</b>
                </div>
                {/* thème formation */}
                <div className="p-2 flex-column col-md-6">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "18px" }}
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
                  <div className="p-2 d-flex flex-row">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "18px" }}
                    >
                      Ajouter une session
                    </div>
                    <div>
                      <Fab
                        size="small"
                        aria-label="Add"
                        onClick={this.props.openAddTraining}
                      >
                        <AddIcon style={{ color: orange[500] }} />
                      </Fab>
                    </div>
                  </div>

                  <div className="p-2">
                    <DateRangeComponent />
                  </div>

                  <div className="p-2">
                    <DateRangeComponent />
                  </div>
                </div>
                {/* add modules */}
                <div className="p-2 flex-column col-md-6">
                  <div className="p-2 d-flex flex-row">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "18px" }}
                    >
                      Ajouter un module
                    </div>
                    <div>
                      <Fab
                        size="small"
                        aria-label="Add"
                        onClick={this.props.openAddTraining}
                      >
                        <AddIcon style={{ color: orange[500] }} />
                      </Fab>
                    </div>
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
                  <div className="p-2 flex-column col-md-6">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "18px" }}
                    >
                      Ajouter un niveau &nbsp;
                      <Fab
                        size="small"
                        aria-label="Add"
                        onClick={this.props.openAddTraining}
                      >
                        <AddIcon style={{ color: orange[500] }} />
                      </Fab>
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

                  <div className="p-2 flex-column col-md-6">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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
                    style={{ color: "#4C25B7", fontSize: "18px" }}
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
                    style={{ color: "#4C25B7", fontSize: "18px" }}
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
                <div className="p-2  d-flex flex-column col-md-10">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "18px" }}
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
                <div className="p-2  d-flex flex-column col-md-10">
                  <div
                    className="p-2"
                    style={{ color: "#4C25B7", fontSize: "18px" }}
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

                {/*lien et lieu formation */}
                <div className="p-2 d-flex flex-row">
                  <div className="p-2  d-flex flex-column col-md-6">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "18px" }}
                    >
                      Lieu
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

                  <div className="p-2  d-flex flex-column col-md-6">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "18px" }}
                    >
                      Lien de la formation *
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

                {/* formateur & description */}
                <div className="p-2 d-flex flex-row ">
                  <div className="p-2  d-flex flex-column col-md-6 ">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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
                  <div className="p-2  d-flex flex-column col-md-6 ">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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
                  <div className="p-2  d-flex flex-column col-md-6">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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

                  <div className="p-2  d-flex flex-column col-md-6">
                    <div
                      className="p-2"
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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
                    style={{ color: "#4C25B7", fontSize: "18px" }}
                  >
                    Prérequis
                  </div>
                  <div className="p-2 col-md-6">
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

                <div
                  className="p-2 "
                  style={{ fontSize: "20px" }}
                >
                  <b>Programme</b>
                </div>
                {/* nombre de jours */}
                <div className=" d-flex flex-row ">
                  <div
                    className="p-4 "
                    style={{ color: "#4C25B7", fontSize: "18px" }}
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
                  <div className="max-width-100 mt-5">
                    <CircularProgressbar
                      percentage="100"
                      text="Jour 1"
                      styles={{
                        path: { stroke: "orange", height: "100%" },
                        text: { fill: "#3D3D3D", fontSize: "18px" },
                      }}
                    />
                  </div>

                  <div className="p-2 d-flex flex-column ml-3">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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

                <div className="p-2 d-flex flex-row">
                  <div className="max-width-100 mt-5">
                    <CircularProgressbar
                      percentage="100"
                      text="Jour 2"
                      styles={{
                        path: { stroke: "orange", height: "100%" },
                        text: { fill: "#3D3D3D", fontSize: "18px" },
                      }}
                    />
                  </div>

                  <div className="p-2 d-flex flex-column ml-3">
                    <div
                      className="p-2 "
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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
                      style={{ color: "#4C25B7", fontSize: "18px" }}
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

                {/* prix */}
                <div className="p-2 d-flex flex-column">
                  <h2>Prix de la formation par personne *</h2>

                  <div className="p-2 col-md-6">
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
                      color="primary"
                      style={{ borderRadius: "80px" }}
                      onClick = {this.props.handleCancel}
                    >
                      Annuler
                    </Button>
                  </div>
                  <div className="p-2 ml-3">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "80px" }}
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
