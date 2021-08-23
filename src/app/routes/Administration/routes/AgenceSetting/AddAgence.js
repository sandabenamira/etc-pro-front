import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";


export default class AddAgence extends Component {
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
                                    <IntlMessages id="add.agency" />
                                </div>
                                <br /><br />

                                {/* */}
                                <div className="p-2 d-flex flex-row ">
                                    <div className="p-2 d-flex flex-column col-md-6 ">
                                        <div style={{ fontSize: "18px" }}>
                                            <IntlMessages id="agency" />
                                        </div>
                                        <div>
                                            <TextField
                                                className="textfield"
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            >
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="p-2 d-flex flex-column col-md-6 ">
                                        <div style={{ fontSize: "18px" }}>
                                            <IntlMessages id="agency.type" />
                                        </div>
                                        <div>
                                            <TextField
                                                className="textfield"
                                                select
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            >
                                            </TextField>
                                        </div>

                                    </div>
                                </div>
                                {/* */}
                                <div className="p-2 d-flex flex-row ">
                                    <div className="p-2 d-flex flex-column col-md-6 ">
                                        <div style={{ fontSize: "18px" }}>
                                            <IntlMessages id="address" />
                                        </div>
                                        <div>
                                            <TextField
                                                className="textfield"
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            >
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="p-2 d-flex flex-column col-md-6 ">
                                        <div style={{ fontSize: "18px" }}>
                                            <IntlMessages id="governorate" />
                                        </div>
                                        <div>
                                            <TextField
                                                className="textfield"
                                                select
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            >
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
                                            <IntlMessages id="mail" />
                                        </div>
                                        <div className="p-2">
                                            <TextField
                                                className="textfield"
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            ></TextField>
                                        </div>
                                    </div>
                                </div>
                                {/* */}
                                <div className="p-2 d-flex flex-row ">
                                    <div className="p-2 d-flex flex-column col-md-6 ">
                                        <div style={{ fontSize: "18px" }}>
                                            <IntlMessages id="fax" />
                                        </div>
                                        <div>
                                            <TextField
                                                className="textfield"
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            >
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="p-2 d-flex flex-column col-md-6 ">
                                        <div style={{ fontSize: "18px" }}>
                                            <IntlMessages id="tel" />
                                        </div>
                                        <div>
                                            <TextField
                                                className="textfield"
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            >
                                            </TextField>
                                        </div>

                                    </div>
                                </div>
                                {/* butons */}
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