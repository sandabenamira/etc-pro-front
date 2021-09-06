import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";

import "react-circular-progressbar/dist/styles.css";

export default class UserDetails extends Component {
  render() {
    const externalCloseBtn = (
      <i
        className="zmdi zmdi-close zmdi-hc-3x"
        style={{
          position: "relative",
          color: "#ffffff",
          marginLeft: "90%",
          marginTop: "5%",
        }}
        onClick={this.props.handleCancel}
      />
    );
    return (
      <div className="app-wrapper">
        <Modal external={externalCloseBtn} isOpen={true}>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              //  onSubmit={this.props.handleSubmit}
            >
              <div className="d-flex justify-content-start flex-row  ">
                <div className="d-flex flex-wrap flex-column  col-lg-12 col-md-12 col-sm-1 justify-content-start align-items-start ">
                  <video controls width="100%">
                    <source
                      src="https://www.youtube.com/watch?v=Ke90Tje7VS0"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <hr
                  style={{ width: "650px", color: "black", marginTop: "55%" }}
                />
              </div>
              <div className="d-flex col-lg-12 col-md-12 col-sm-10  justify-content-start flex-row flex-wrap ">
                <div className=" d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#606060" }}>
                      Ajouté le 07/09
                    </h1>

                    <h1 style={{ fontSize: "20px", color: "#606060" }}>
                      Ajouté par Ahmed Achoura
                    </h1>
                    <h1 style={{ fontSize: "20px", color: "#606060" }}>
                      Déstiné aux Managers
                    </h1>
                  </h1>
                </div>
              </div>

              {/* Add adress */}
              <div className="d-flex justify-content-start flex-row flex-wrap d-flex col-lg-12 col-md-12 col-sm-10  ">
                <div className=" d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#606060" }}>
                      Description
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      hello there how are u
                    </h2>
                  </h1>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
