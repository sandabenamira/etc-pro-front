import React,{useState} from "react";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import { Modal, ModalBody } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";

import "react-circular-progressbar/dist/styles.css";
export default function InscriptionModal(props) {

 const [confirm,setConfirm]=useState(props.data.confirme)
 console.log(typeof(props.data.confirme))
 console.log("hello confirmer",props.data.confirme)

  return (
    <div>
      <Modal isOpen={true}>
        <ModalBody>
          <form className="row" autoComplete="off" onSubmit={props.handleClick}>
            <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-8 col-sm-12 mt-0">
              <div className=" d-flex flex-row d-flex justify-content-end ">
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={props.opendetailsUser}
                  //   style={{ width: 100, height: 100 }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <br />

              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className=" d-flex flex-row col-md-12 col-sm-12 col-lg-12 d-flex align-items-end"></div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      nom :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.nom}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Numéro Série :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.numSerie}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Addresse :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.addresse}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>email:</h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.email}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Gouvernorat :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.gouvernorat}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Created en :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.createdIn}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      pays :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.pays}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    créer en :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.createdIn}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}></h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {/* {props.data.choixDevise} */}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Choix Devise :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.choixDevise}
                    </h2>
                  </h1>
                </div>
                {/* <Button
                type="button"
                className="close"
                aria-label="Close"
                onClick={props.opendetailsUser}
                style={{ width: 100, height: 100 }}
              >
                <span aria-hidden="true">&times;</span>
              </Button> */}
              </div>
              <hr style={{ width: "650px", color: "black" }} />
              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className=" d-flex flex-row col-md-12 col-sm-12 col-lg-12 d-flex align-items-end"></div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Nom utilisateur:
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.nomUser}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Prénom :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.prenoUser}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      addresseUser :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.addresseUser}
                    </h2>
                  </h1>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Email :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.emailUser}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  align-items-start mt-0 ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Numero Téléphone :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.numeroTelephoneUser}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  align-items-start mt-0 "></div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-end   align-items-end mt-0">
                  <button
                    style={{
                      background: "white",
                    }}
                    onClick={confirm}
                  >
                    Annuler
                  </button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  align-items-start mt-0 ">
                  <button
                    style={{
                      background: "white",
                    }}
                    onClick={confirm}
                  >
                    Confirmer
                  </button>

                </div>
                {/* <Button
                type="button"
                className="close"
                aria-label="Close"
                onClick={props.opendetailsUser}
                style={{ width: 100, height: 100 }}
              >
                <span aria-hidden="true">&times;</span>
              </Button> */}
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
