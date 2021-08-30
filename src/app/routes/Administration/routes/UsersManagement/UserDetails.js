import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";

import Avatar from "@material-ui/core/Avatar";

import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
//import IntlMessages from "../../../../../util/IntlMessages";
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';

export default class UserDetails extends Component {
  render() {
    //const { values } = this.props;
    return (
      <div className="app-wrapper">
        <Modal isOpen={true}>
          <ModalBody>
            <form
              className="row"
              autoComplete="off"
              onSubmit={this.props.handleSubmit}
            >
              <div className="d-flex flex-wrap justify-content-between flex-column col-lg-8 col-md-12 col-sm-8">
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
                {/* caracter */}
                <div className=" d-flex flex-row justify-content-start  ">
                  <div className=" m-2 d-flex flex-row col-md-4 d-flex justify-content-around align-items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://www.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                      style={{ width: 180, height: 180 }}
                    />
                  </div>
                  <div className=" d-flex flex-column col-md-9 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "35px", color: "#44548F" }}>
                      oudherfi oumaima
                    </h1>
                    <h2 style={{ fontSize: "30px", color: "#8C8C8C" }}>
                      Responsable Formation
                    </h2>

                    <h3 style={{ fontSize: "30px", color: "#8C8C8C" }}>
                      <b>Identifiant : </b>oudherfi oumaima5
                    </h3>
                    <h4 style={{ fontSize: "30px", color: "#8C8C8C" }}>
                      <b>Agence : </b> Agence 5
                    </h4>
                  </div>
                </div>

                <div className=" d-flex flex-row d-flex justify-content-start ">
                  <div className=" d-flex flex-column col-md-12 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "35px", color: "#FFFFFF" }}>
                      *********************************************
                      <hr />
                    </h1>
                    <br />
                  </div>
                </div>

                {/* Add contact */}
                <div className=" d-flex flex-row d-flex justify-content-start ">
                  <div className=" d-flex flex-column col-md-7 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      Date de naissance
                    </h1>

                    <h2 style={{ fontSize: "25px", color: "#8C8C8C" }}>
                      17/04/2000
                    </h2>
                  </div>
                  <div className=" d-flex flex-column col-md-4 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>CIN</h1>

                    <h2 style={{ fontSize: "25px", color: "#8C8C8C" }}>
                      0000000
                    </h2>
                  </div>
                </div>

                {/* Add adress */}
                <div className=" d-flex flex-row d-flex justify-content-start ">
                  <div className=" d-flex flex-column col-md-7 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      adresse postale
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      avenue hbib bourguiba, borj cedria
                    </h2>
                  </div>
                  <div className=" d-flex flex-column col-md-4 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      code Postale
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>4120</h2>
                  </div>
                </div>

                <div className=" d-flex flex-row d-flex justify-content-start ">
                  <div className=" d-flex flex-column col-md-7 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      Email
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      oumaima.afff@gmail.com
                    </h2>
                  </div>
                  <div className=" d-flex flex-column col-md-4 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>
                      Num Tél
                    </h1>

                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      99944754548
                    </h2>
                  </div>
                </div>
                <br />
                <div className=" d-flex flex-row d-flex justify-content-start ">
                  <div className=" d-flex flex-column col-md-7 d-flex justify-content-start align-items-start">
                    <h1 style={{ fontSize: "25px", color: "#44548F" }}>Pays</h1>
                    <h2 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                      Tunisie
                    </h2>
                  </div>
                </div>
                <br/>
                <div className=" d-flex flex-row d-flex justify-content-start ">
                  <div className=" d-flex flex-column col-md-7 d-flex justify-content-start align-items-start" >
                  <h1 style={{ fontSize: "25px", color: "#44548F" }}> Papier administratif (1)</h1>
                  </div>
                  <div className="">
                 
                  <h1 style={{ fontSize: "23px", color: "#8C8C8C" }}>
                  < PictureAsPdfOutlinedIcon
                     
                     
                     />
                      Contrat Biat
                      <hr />
                   </h1 >
                     
                   
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
