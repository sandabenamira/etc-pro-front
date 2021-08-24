import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import AttachmentIcon from '@material-ui/icons/Attachment';
import TextField from "@material-ui/core/TextField";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
export default class AddMoocs extends Component {
  render() {
    const { values } = this.props;
    const externalCloseBtn = (
      <i
        className="zmdi zmdi-close zmdi-hc-3x"
        style={{
          position: 'relative',
          color: '#ffffff',
          marginLeft: '90%',
          marginTop: '5%',
        }}
        onClick={this.props.handleCancel}
      />
    );
    return (
      <div className="app-wrapper">

        <Modal isOpen={values.isOpen}
          style={{
            top: "10%",
            outline: "none",
            overflow: "hidden",
          }}
          external={externalCloseBtn}

        >

          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              onSubmit={this.props.handleSubmit}
            >
              <div className="p- m-2 d-flex flex-wrap justify-content-center flex-column col-lg-12 col-md-11 col-sm-12">
                <div
                  className="d-flex justify-content-center  mt-3"
                  style={{ color: "#4C25B7", fontSize: "25px", fontWeight: "bold" }}
                >

                  <IntlMessages id="add.moocs" />

                </div>

                <br />
                <br />



                {/* add Moocs */}
                <div className=" d-flex flex-row d-flex justify-content-between">
                  <div
                    className=" col-md-6"
                    style={{ color: "primary", fontSize: "18px", }}
                  >
                    <IntlMessages id="subject.message" />


                  </div>
                  <div
                    className=" col-md-6"
                    style={{ color: "primary", fontSize: "18px", }}
                  >
                    <IntlMessages id="Intended.for" />
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
                    <div style={{ color: "primary", fontSize: "18px", }}>
                      <IntlMessages id="components.virtual.description" />

                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        id="descriptionTraining"
                        
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
                    <IntlMessages id="stuppUser.formadd.file" />
                  </div>
                  <div className="ml-5">
                    <Button
                      variant="contained"
                      color="default"
                      style={{ borderRadius: "80px", fontWeight: "bold" }}
                      startIcon={<AttachmentIcon />}
                    >
                      <IntlMessages id="message.attach.file" />
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
                     <IntlMessages id="button.no" />
                    </Button>
                  </div>
                  <div className="p-2 ml-3">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "80px", fontWeight: "bold" }}
                      type="submit"
                    >
                     <IntlMessages id="button.yes" />
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