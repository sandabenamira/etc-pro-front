import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";

export default class ModalExportUser extends Component {
  render() {   /* eslint eqeqeq: "off" */
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.exportHasOpen}
          toggle={this.props.handleCancel}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="export.file.user" />}
          </ModalHeader>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              onSubmit={this.props.handleSubmitExportCsv}
            >
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
                      {<IntlMessages id="user.type.export" />}
                    </InputLabel>
                    <Select
                      required={true}
                      options={this.props.options}
                      onChange={this.props.handleChangeClass}
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
                    <IntlMessages id="export.button" />
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
