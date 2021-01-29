import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
export default class ModalImportUser extends Component {
  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  render() {
    const rows = [
      this.createData("John walls", 159, 6.0, 24, "OK"),
      this.createData("Danielle walls", 237, 9.0, 37, "NOT OK"),
      this.createData("Walter Daniel", 262, 16.0, 24, "OK"),
      this.createData("Sami walls", 305, 3.7, 67, "NOT OK"),
      this.createData("Ghabriel walls", 356, 16.0, 49, "OK"),
    ];
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.importisOpen}
          toggle={this.props.handleCancel}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="upload.file.user" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmitImport}>
              <div className=" col-sm-12 col-lg-12 col-md-12 ">
                <div className="col-md-12 text-left  d-flex flex-wrap justify-content-end">
                  <div className="col-md-12 col-lg-12 col-sm-12 pt-3 pb-3">
                    <InputLabel
                      htmlFor="nomSelect"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "18px",
                      }}
                      required
                    >
                      {<IntlMessages id="role.user.type.import" />}
                    </InputLabel>
                    <Select
                      required
                      options={this.props.options}
                      onChange={this.props.handleChangeRole}
                      id="role"
                      name="role"
                      styles={{
                        control: (base) => ({
                          ...base,
                          "&:hover": { borderColor: "gray" }, // border style on hover
                          border: "1px solid lightgray", // default border color
                          boxShadow: "none", // no box-shadow
                          borderTopStyle: "none",
                          borderRightStyle: "none",
                          borderLeftStyle: "none",
                          borderRadius: " none",
                        }),
                      }}
                    />{" "}
                  </div>
                  <div className="col-sm-12 col-lg-12 col-md-12  mb-3">
                    <input
                      id="input"
                      type="file"
                      onChange={(e) => this.props.onDrop(e)}
                    />
                  </div>
                  <div className="col-sm-12 col-lg-12 col-md-12  mb-3">
                    <TableContainer component={Paper}>
                      <Table
                        style={{ width: "100%" }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Role</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Prénom</TableCell>
                            <TableCell align="right">Check upload</TableCell>
                            <TableCell align="center">Statut import</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.calories}
                              </TableCell>
                              <TableCell align="right">{row.fat}</TableCell>
                              <TableCell align="right">{row.carbs}</TableCell>
                              <TableCell align="center">
                                {row.protein}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <Button
                    variant="contained"
                    style={{
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      width: "100px",
                      height: "40px",
                    }}
                    className=" bg-indigo text-white "
                    type="submit"
                  >
                    <IntlMessages id="components.user.import" />
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="contained"
                    style={{
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      width: "100px",
                      height: "40px",
                    }}
                    className=" bg-grey text-white "
                    onClick={this.props.handleCancel}
                  >
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  </Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
