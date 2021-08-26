import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { orange } from "@material-ui/core/colors";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import AttachmentIcon from "@material-ui/icons/Attachment";

export default class UserDetails extends Component {
  render() {
    const { values } = this.props;
    return (
      <div className="app-wrapper">
        <Modal isOpen={true}>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              onSubmit={this.props.handleSubmit}
            >
              <div className="d-flex flex-wrap justify-content-between flex-column col-lg-8 col-md-12 col-sm-12">
                <br />
                {/* caracter */}
                <div className=" d-flex flex-row d-flex justify-content-start ">
                  <div className=" m-2 d-flex flex-row col-md-6 d-flex justify-content-around align-items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://www.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                      style={{ width: 180, height: 180 }}
                    />
                  </div>
                  <div className=" d-flex flex-column col-md-12 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "35px", color: "#44548F" }}>
                      oudherfi oumaima
                    </h1>
                    <h2 style={{ fontSize: "30px", color: "#8C8C8C" }}>
                      Responsable Formation
                    </h2>
                    
                    <h3 style={{ fontSize: "30px", color: "#8C8C8C" }} ><b>Identifiant : </b>oudherfi oumaima5</h3> 
                    <h4 style={{ fontSize: "30px", color: "#8C8C8C" }} ><b>Agence : </b> Agence 5</h4> 
                  
                    
                  </div>
                  
                </div>

                
                {/* Add coord */}
                <div className="p-2 d-flex flex-row ">
                  <div className="p-3 d-flex flex-column col-md-6 ">
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

                   
                  </div>
                  <div className="p-1 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-row col-md-6 ">
                    <div style={{ fontSize: "20px", color: "orange" }}>
                      <AddCircleOutlineOutlinedIcon
                        style={{ color: orange[500] }}
                      />

                      <IntlMessages id="add.picture" />
                    </div>
                  </div>
                </div>
                <div className="p-2 d-flex flex-row ">
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                  <div className="p-2 d-flex flex-column col-md-6 ">
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
                <div className="p-2 d-flex flex-row">
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
                <div className="p-2 d-flex flex-row justify-content-center">
                  <div className="p-2">
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ borderRadius: "80px" }}
                      onClick={this.props.opendetailsUser}
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
