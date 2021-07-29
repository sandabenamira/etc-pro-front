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
import RemoveIcon from "@material-ui/icons/Remove";

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

                {/* session */}
                <div className="p-2 flex-column">
                  <div
                    className="p-2 "
                    style={{ color: "#4C25B7", fontSize: "18px" }}
                  >
                    Ajouter une session
                  </div>
                  {values.sessions.map((sessionItem, index) => (
                    <div className="p-2 d-flex flex-row">
                      <div className="p-2">
                        <DateRangeComponent
                          index={index}
                          setDate={this.props.setDate}
                          dateSession={sessionItem || ""}
                        />
                      </div>
                      <div className="p-2 ml-2">
                        <Fab
                          size="small"
                          aria-label="Add"
                          value={`${index}`}
                          onClick={() => {
                            if (!sessionItem.isAdded) {
                              if (sessionItem.startDate !== "") {
                                this.props.addNewChoice(index + 1, "sessions");
                              }
                            } else {
                              this.props.deleteChoice(index, "sessions");
                            }
                          }}
                        >
                          {sessionItem.isAdded ? (
                            <RemoveIcon style={{ color: orange[500] }} />
                          ) : (
                            <AddIcon style={{ color: orange[500] }} />
                          )}
                        </Fab>
                      </div>
                    </div>
                  ))}
                </div>
                {/* add modules */}
                <div className="p-2 flex-column col-md-6">
                  <div
                    className="p-2 "
                    style={{ color: "#4C25B7", fontSize: "18px" }}
                  >
                    Ajouter un module
                  </div>

                  {values.modules.map((moduleItem, index) => (
                    <div className="p-2 d-flex flex-row">
                      <div>
                        <TextField
                          className="textfield"
                          id="module"
                          value={moduleItem.title || ""}
                          onChange={(e) =>
                            this.props.handleChangeModules(e, "title", index)
                          }
                          SelectProps={{}}
                          margin="normal"
                          fullWidth
                          size="small"
                        />
                      </div>
                      <div className="p-2 ml-2">
                        <Fab
                          size="small"
                          aria-label="Add"
                          value={`${index}`}
                          onClick={() => {
                            if (!moduleItem.isAdded) {
                              if (moduleItem.title !== "") {
                                this.props.addNewChoice(index + 1, "modules");
                              }
                            } else {
                              this.props.deleteChoice(index, "modules");
                            }
                          }}
                        >
                          {moduleItem.isAdded ? (
                            <RemoveIcon style={{ color: orange[500] }} />
                          ) : (
                            <AddIcon style={{ color: orange[500] }} />
                          )}
                        </Fab>
                      </div>
                    </div>
                  ))}
                </div>

                {/* add level */}
                <div className=" d-flex flex-row">
                  <div
                    className=" col-md-6"
                    style={{ color: "#4C25B7", fontSize: "18px" }}
                  >
                    Ajouter un niveau &nbsp;
                  </div>
                  <div
                    className=" col-md-6"
                    style={{ color: "#4C25B7", fontSize: "18px" }}
                  >
                    Associer à un module
                  </div>
                </div>

                {values.levelsModules.map((item, index) => (
                  <div className=" d-flex flex-row">
                    <div className=" col-md-5">
                      <TextField
                        className="textfield"
                        id="levelName"
                        value={item.levelName || ""}
                        onChange={(e) =>
                          this.props.handleChangeLevelsModules(
                            e,
                            "levelName",
                            index
                          )
                        }
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                    <div className=" col-md-5">
                      <TextField
                        className="textfield"
                        id="moduleName"
                        value={item.moduleName || ""}
                        onChange={(e) =>
                          this.props.handleChangeLevelsModules(
                            e,
                            "moduleName",
                            index
                          )
                        }
                        select
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      >
                        {values.modules.map((item) => (
                          <MenuItem key={item.id} value={item.value}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className=" p-2 col-md-2">
                      <Fab
                        size="small"
                        aria-label="Add"
                        value={`${index}`}
                        onClick={() => {
                          if (!item.isAdded) {
                            if (item.title !== "") {
                              this.props.addNewChoice(
                                index + 1,
                                "levelsModules"
                              );
                            }
                          } else {
                            this.props.deleteChoice(index, "levelsModules");
                          }
                        }}
                      >
                        {item.isAdded ? (
                          <RemoveIcon style={{ color: orange[500] }} />
                        ) : (
                          <AddIcon style={{ color: orange[500] }} />
                        )}
                      </Fab>
                    </div>
                  </div>
                ))}

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
                      aria-label="certificate"
                      name="certificate"
                      value={values.certificate}
                      onChange={this.props.handleChange("certificate")}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label="Oui"
                      />

                      <FormControlLabel
                        value="false"
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
                {/* titre formation */}
                <div className="  d-flex flex-column col-md-10">
                  <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                    Titre de la formation *
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      id="titleTraining"
                      onChange={this.props.handleChange("titleTraining")}
                      value={values.titleTraining}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>

                {/* description formation */}
                <div className="p-2  d-flex flex-column col-md-10">
                  <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                    Description
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
                    ></TextField>
                  </div>
                </div>

                {/*lien et lieu formation */}
                <div className="p-2 d-flex flex-row">
                  <div className=" p-2 d-flex flex-column col-md-6">
                    <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                      Lieu
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        id="PlaceTraining"
                        onChange={this.props.handleChange("PlaceTraining")}
                        value={values.PlaceTraining}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>

                  <div className="p-2  d-flex flex-column col-md-6">
                    <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                      Lien de la formation *
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        id="linkTraining"
                        onChange={this.props.handleChange("linkTraining")}
                        value={values.linkTraining}
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
                    <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                      Formateur *
                    </div>
                    <div>
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
                    <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                      Description
                    </div>

                    <div>
                      <TextField
                        className="textfield"
                        id="descriptionFormer"
                        onChange={this.props.handleChange("descriptionFormer")}
                        value={values.descriptionFormer}
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
                    <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                      Objectif de la formation
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        id="goal"
                        onChange={this.props.handleChange("goal")}
                        value={values.goal}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>

                  <div className="p-2  d-flex flex-column col-md-6">
                    <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                      Méthodologie
                    </div>

                    <div>
                      <TextField
                        className="textfield"
                        id="methodology"
                        onChange={this.props.handleChange("methodology")}
                        value={values.methodology}
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
                  <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                    Prérequis
                  </div>
                  <div className=" col-md-6">
                    <TextField
                      className="textfield"
                      id="Prerequisites"
                      onChange={this.props.handleChange("Prerequisites")}
                      value={values.Prerequisites}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                    ></TextField>
                  </div>
                </div>
                {/* Programmes */}

                <div className="p-2 " style={{ fontSize: "20px" }}>
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
                      id="nbrDays"
                      type="number"
                      onChange={this.props.handleChange("nbrDays")}
                      value={values.nbrDays}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                      size="small"
                      inputProps={{ min: 0 }}
                    ></TextField>
                  </div>
                </div>
                {values.programs.map((item, index) => (
                  <div className="p-2 d-flex flex-row">
                    <div className="max-width-100 mt-5">
                      <CircularProgressbar
                        percentage="100"
                        text={`Jour ${index + 1}`}
                        styles={{
                          path: { stroke: "orange", height: "100%" },
                          text: { fill: "#3D3D3D", fontSize: "18px" },
                        }}
                      />
                    </div>

                    <div className="p-2 d-flex flex-column ml-3 col-md-8">
                      <div style={{ color: "#4C25B7", fontSize: "18px" }}>
                        Titre
                      </div>
                      <div className="col-md-6">
                        <TextField
                          className="textfield"
                          id="titleProg"
                          value={item.title || ""}
                          onChange={(e) =>
                            this.props.handleChangePrograms(
                              e,
                              "title",
                              index
                            )
                          }
                          SelectProps={{}}
                          margin="normal"
                          fullWidth
                          size="small"
                        />
                      </div>

                      <div
                        className="mt-2"
                        style={{ color: "#4C25B7", fontSize: "18px" }}
                      >
                        Description
                      </div>

                      <div className="p-2 d-flex flex-row col-md-12">
                        <div className="col-md-10">
                          <TextField
                            className="textfield"
                            id="descriptionProg"
                            value={item.description || ""}
                            onChange={(e) =>
                              this.props.handleChangePrograms(
                                e,
                                "description",
                                index
                              )
                            }
                            SelectProps={{}}
                            margin="normal"
                            fullWidth
                            size="small"
                          />
                        </div>
                        <div className=" p-2 col-md-2">
                          <Fab
                            size="small"
                            aria-label="Add"
                            value={`${index}`}
                            onClick={() => {
                              if (!item.isAdded) {
                                if (
                                  item.title !== "" ||
                                  item.description !== ""
                                ) {
                                  this.props.addNewChoice(
                                    index + 1,
                                    "programs"
                                  );
                                }
                              } else {
                                this.props.deleteChoice(index, "programs");
                              }
                            }}
                          >
                            {item.isAdded ? (
                              <RemoveIcon style={{ color: orange[500] }} />
                            ) : (
                              <AddIcon style={{ color: orange[500] }} />
                            )}
                          </Fab>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* prix */}
                <div className="p-2 d-flex flex-column">
                  <h2>Prix de la formation par personne *</h2>

                  <div className="col-md-6">
                    <TextField
                      type="number"
                      id="price"
                      onChange={this.props.handleChange("price")}
                      value={values.price}
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
