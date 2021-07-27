import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

export default class AddTraining extends Component {
  render() {
    const { values } = this.props;
    return (
      <div className="app-wrapper">
        <Modal isOpen={values.isOpen}>
          <ModalHeader
            //   toggle={this.handleCancel}
            // className="modal-box-header "
          >
            <div style={{textAlign:"center"}}>Ajouter une formation</div>  
          </ModalHeader>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              //   onSubmit={this.handleSubmit}
            >
              <div className="d-flex flex-column ">
                <div className="p-2 "><h2>Informations générales</h2></div>
                <div className="p-2 flex-column" >
                <div className="p-2" style={{color:"#4C25B7", fontSize: "16px"}}>
                Thème de la formation
                </div>
                <div >
                <TextField
              className="textfield"
              id="level_id"
              //   onChange={this.props.handleChangeLevel(
              //     "level_id"
              //   )}
              select
              label="Filtrer par"
              //   value={this.props.values.level_id}
              SelectProps={{}}
              margin="normal"
              fullWidth
              size="small"
            >
              {[
                { id: 1, name: "plus récent" },
                { id: 2, name: "Favoris" },
                { id: 3, name: "Inscription" },
              ].map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
                </div>
                </div>
                <div className="p-2">Flex item 3</div>
                <div className="p-2">Flex item 1</div>
                <div className="p-2">Flex item 2</div>
                <div className="p-2">Flex item 3</div>
                <div className="p-2">Flex item 1</div>
                <div className="p-2">Flex item 2</div>
                <div className="p-2">Flex item 3</div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
