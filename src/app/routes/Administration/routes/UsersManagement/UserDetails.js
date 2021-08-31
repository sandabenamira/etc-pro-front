import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";

import Avatar from "@material-ui/core/Avatar";

import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";

export default class UserDetails extends Component {
  render() {
    // const { values } = this.props;
    return (
      <div className="app-wrapper">
        <Modal isOpen={true}>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              onSubmit={this.props.handleSubmit}
            >
              <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-8 col-sm-12">
                <div className=" d-flex flex-row d-flex justify-content-end ">
                  <div className=" p-1 m-6 d-flex flex-row col-md-1 d-flex align-items-start">
                    <Button
                      type="button"
                      class="close"
                      aria-label="Close"
                      onClick={this.props.opendetailsUser}
                      style={{ width: 30, height: 30 }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </Button>
                  </div>
                </div>

                <br />

                <div className="d-flex justify-content-center flex-row flex-wrap ">
                  <div className="col-lg-4 col-md-8 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start">
                    <h1>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://www.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                        style={{ width: 180, height: 180 }}
                      />
                    </h1>
                  </div>

                  <div className="col-lg-8 col-md-12 col-sm-4 d-flex flex-column justify-content-start  ">
                    <h1>
                      <h1 style={{ fontSize: "35px", color: "#44548F" }}>
                        oudherfi oumaima
                      </h1>
                      <h2 style={{ fontSize: "30px", color: "#8C8C8C" }}>
                        Responsable Formation
                      </h2>

                      <h3 style={{ fontSize: "30px", color: "#8C8C8C" }}>
                        <b>
                          <IntlMessages id="user.identifiant" />    
                        </b>
                        <b> :  </b>
                        oudherfi oumaima5
                      </h3>
                      <h4 style={{ fontSize: "30px", color: "#8C8C8C" }}>
                        <b>
                          <IntlMessages id="gestion.agence.agency" /> :
                        </b>{" "}
                        Agence 5
                      </h4>
                    </h1>
                  </div>
                </div>
                <hr style={{ width: "700px", color: "black" }} />
                <div className=" d-flex flex-row d-flex justify-content-start bd-highlight flex-wrap ">
                  <div className=" d-flex flex-column col-md-5 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      <IntlMessages id="user.birthday.date" />
                    </h1>

                    <h2 style={{ fontSize: "25px", color: "#8C8C8C" }}>
                      17/04/2000
                    </h2>
                  </div>
                  <div className=" d-flex flex-column col-md-5 d-flex justify-content-start align-items-start bd-highlight flex-wrap ">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>CIN</h1>

                    <h2 style={{ fontSize: "25px", color: "#8C8C8C" }}>
                      00000007
                    </h2>
                  </div>
                </div>

                {/* Add adress */}
                <div className=" d-flex flex-row d-flex justify-content-start bd-highlight flex-wrap">
                  <div className=" d-flex flex-column col-md-5 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      <IntlMessages id="user.address.postal" />
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      avenue hbib bourguiba, borj cedria
                    </h2>
                  </div>
                  <div className=" d-flex flex-column col-md-5 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      <IntlMessages id="zip.code.user" />
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>4120</h2>
                  </div>
                </div>

                <div className=" d-flex flex-row d-flex justify-content-start bd-highlight flex-wrap">
                  <div className=" d-flex flex-column col-md-5 d-flex justify-content-around align-items-start bd-highlight flex-wrap">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      <IntlMessages id="appModule.email" />
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      oumaima.afff@gmail.com
                    </h2>
                  </div>
                  <div className=" d-flex flex-column col-md-6 d-flex flex-wrap justify-content-start align-items-start bd-highlight flex-wrap">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      <IntlMessages id="stuppUser.formadd.phone" />
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      99944754548
                    </h2>
                  </div>
                </div>
                <br />
                <div className=" d-flex flex-row d-flex justify-content-start bd-highlight flex-wrap">
                  <div className=" d-flex flex-column col-md-5 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      <IntlMessages id="country.user" />
                    </h1>
                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      Tunisie
                    </h2>
                  </div>
                </div>
                <br />
                <div className=" d-flex flex-row d-flex justify-content-start bd-highlight flex-wrap">
                  <div className=" d-flex flex-column col-md-7 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      {" "}
                      <IntlMessages id="user.join.papiers" /> (1)
                    </h1>
                  </div>
                  <div className="">
                    <h1 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      <PictureAsPdfOutlinedIcon />
                      Contrat Biat
                      <hr />
                    </h1>
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
