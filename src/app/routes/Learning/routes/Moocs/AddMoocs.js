import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

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
                  
                  
                  </form>
                  
                  
                  </ModalBody>
        </Modal>
                  
                  </div>
                  



                  );
  }
}

                  
                  
                  
  