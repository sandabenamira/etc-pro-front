import React, { Component } from "react";
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

export default class AddUser extends Component {
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
              <div className=" d-flex flex-wrap justify-content-center flex-column col-lg-8 col-md-11 bd-highlight col-sm-12">
                <div
                  className="d-flex justify-item-center justify-content-center mt-8"
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
                      ></TextField>
                    </div>
                  </div>
                  <div className=" d-flex flex-row flex-wrap bd-highlight col-md-4 ">
                    <div className="p-2" style={{ fontSize: "18px" }}>
                      <IntlMessages id="user.genre" />

                      <div className="">
                        <RadioGroup className="d-flex flex-row  flex-wrap justify-content-start">
                          <FormControlLabel
                            value="male"
                            control={<Radio color="primary" />}
                          />
                          <i
                            className="zmdi zmdi-male-alt zmdi-hc-3x"
                            style={{ color: "blue" }}
                          ></i>
                          <FormControlLabel
                            value="female"
                            control={<Radio color="primary" />}
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
                <div className=" d-flex flex-row ">
                  <div className="m-3 d-flex flex-column flex-wrap col-md-7">
                    <div style={{ fontSize: "18px" }}>
                      <IntlMessages id="user.birthday.date" />
                      <TextField
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        //className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>

                    <div></div>
                  </div>
                  <div className="m-1 d-flex bd-highlight flex-wrap flex-column col-md-5 ">
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
                      ></TextField>
                    </div>
                  </div>
                </div>

                {/* Add contact */}
                <div className="p-2 d-flex flex-row ">
                  <div className=" d-flex flex-column flex-wrap col-md-4">
                   <div style={{ fontSize: "18px" }}>
                      <IntlMessages id="user.mail" />
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                  <div className=" d-flex flex-wrap flex-column col-md-5 ">
                    <div style={{ fontSize: "18px" }}>
                      <IntlMessages id="user.phone.number" />
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                  <div className=" d-flex flex-wrap flex-column col-md-4 ">
                    <div style={{ fontSize: "18px" }}>
                      <IntlMessages id="user.cin" />
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                </div>
                {/* Add contact */}
                <div className="p-2 d-flex flex-row ">
                  <div className=" d-flex flex-column flex-wrap col-md-6">
                   <div style={{ fontSize: "18px" }}>
                      Adresse Postale
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                  <div className=" d-flex flex-wrap flex-column col-md-4 ">
                    <div style={{ fontSize: "18px" }}>
                      <IntlMessages id="zip.code.user" />
                    </div>
                    <div>
                      <TextField
                        className="textfield"
                        margin="normal"
                        fullWidth
                        size="small"
                      ></TextField>
                    </div>
                  </div>
                  <div className="p-2 d-flex flex-row  flex-wrap col-md-4 ">
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
