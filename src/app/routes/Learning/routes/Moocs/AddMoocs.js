import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import IconButton from '@material-ui/core/IconButton';
import AttachmentIcon from '@material-ui/icons/Attachment';
import TextField from "@material-ui/core/TextField";


import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";


export default class AddMoocs extends Component {
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
              <div className="p- m-2 d-flex flex-wrap justify-content-center flex-column col-lg-12 col-md-11 col-sm-12">
                <div
                  className="d-flex justify-content-center  mt-3"
                  style={{ color: "#4C25B7", fontSize: "25px",fontWeight: "bold" }}
                >
                  Ajouter Moocs
                </div>

                <br />
                <br />

            
                

                {/* add Moocs */}
                <div className=" d-flex flex-row d-flex justify-content-between">
                  <div
                    className=" col-md-6"
                    style={{ color: "primary", fontSize: "18px" ,}}
                  >
                    Sujet &nbsp;
                  </div>
                  <div
                    className=" col-md-6"
                    style={{ color: "primary", fontSize: "18px" , }}
                  >
                    Destiné aux 
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
                        
                        margin="normal"
                        fullWidth
                        size="small"
                      >
                      
                      </TextField>
                    </div>
                    <div className=" p-2 col-md-2">
                      
                    </div>
                  </div>
                ))}

                
                

                

                {/* description moocs */}
                <div className="p-2 d-flex flex-row">
                <div className="p-2  d-flex flex-column col-md-10">
                  <div style={{ color: "primary", fontSize: "18px" ,}}>
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
                </div>
                
                {/* joindre Moocs */}

                <div className="p-2 d-flex flex-row">
                  <div
                    className="p-2"
                    style={{ fontSize: "18px" }}
                  >
                    Joindre fichier
                  </div>
                  <div className="ml-5">
                    <Button
                      variant="contained"
                      color="default"
                      
                      startIcon={<AttachmentIcon />}
                    >
                      Pièce jointe
                    </Button>

                  </div>
                </div>
      
                  
                

                

                
                {/* les bouttons */}
                <div className="p-2 d-flex flex-row justify-content-center">
                  <div className="p-2">
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ borderRadius: "80px", fontWeight: "bold" }}
                      onClick={this.props.handleCancel}
                    >
                      Annuler
                    </Button>
                  </div>
                  <div className="p-2 ml-3">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "80px",fontWeight: "bold" }}
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