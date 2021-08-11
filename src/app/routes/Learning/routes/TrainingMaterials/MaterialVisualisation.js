import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import "react-circular-progressbar/dist/styles.css";



export default class MaterialVisualisation extends Component {
  render() {
    const { values } = this.props;

    return (
      <div className="app-wrapper">
        <Modal isOpen={values.isOpen}>
          <ModalBody>
            
                 
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
