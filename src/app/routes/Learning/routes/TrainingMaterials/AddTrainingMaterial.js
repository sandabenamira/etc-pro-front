import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AttachmentIcon from '@material-ui/icons/Attachment';
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";


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
              <div className="d-flex flex-column ml-5 col-lg-10 col-md-8 ">
                <div
                  className="d-flex justify-content-center mt-3"
                  style={{ color: "#4C25B7", fontSize: "25px" }}
                >
                  <IntlMessages id="add.material" />
                </div>
                <br /><br />

                {/* Ajout d'un support de formation */}
                <div className="p-2 d-flex flex-row ">
                  <div className="p-2  d-flex flex-column col-md-6 ">
                    <div style={{ fontSize: "18px" }}>
                      <IntlMessages id="subject" />
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
                    <div style={{ fontSize: "18px" }}>
                      <IntlMessages id="asociate.training" />
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
                  <div className="p-2 flex-column col-lg-10 col-md-10">
                    <div
                      className="p-2"
                      style={{ fontSize: "18px" }}
                    >
                      <IntlMessages id="intended.for" />
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
                  <div className="p-2 flex-column col-lg-10 col-md-10">
                    <div
                      className="p-2"
                      style={{ fontSize: "18px" }}
                    >
                      <IntlMessages id="description" />
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


                {/* joindre fichier */}

                <div className="p-2 d-flex flex-row">
                  <div
                    className="p-2"
                    style={{ fontSize: "18px" }}
                  >
                    <IntlMessages id="upload.file" />
                  </div>
                  <div className="ml-5">
                    <Button
                      variant="contained"
                      color="default"

                      startIcon={<AttachmentIcon />}
                    >
                      <IntlMessages id="attachment" />
                    </Button>

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
                      <IntlMessages id="cancel" />
                    </Button>
                  </div>
                  <div className="p-2 ml-3">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "80px" }}
                      type="submit"
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
}
