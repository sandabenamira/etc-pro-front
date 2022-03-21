import { Modal, ModalBody } from "reactstrap";

import Button from "@material-ui/core/Button";

import "react-circular-progressbar/dist/styles.css";

function EntrepriseModal(props) {
  return (
      <Modal isOpen={true}>
        <ModalBody>
          <form className="row" autoComplete="off">
            <div className="d-flex flex-column ml-5 col-lg-10 col-md-8 ">
              <div
                className="d-flex justify-content-end mt-2 "
                style={{
                  color: "#4C25B7",
                  fontSize: "25px",
                  marginRight: "-10%",
                }}
              >
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={props.opendetailsUser}
                  // style={{ width: 100, height: 100 }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="d-flex justify-content-center mt-2 ">
                <h1
                  style={{
                    color: "#44548F",
                  }}
                >
                  Détails de la société
                </h1>
              </div>

              <div className="p-2 d-flex flex-row ">
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>nom :</h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.nom}
                  </h2>
                </div>
                <div className="p-2 d-flex flex-column col-md-6  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Numéro Série :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.numSerie}
                  </h2>
                </div>
              </div>
              <div className="p-2 d-flex flex-row ">
                <div className="p-2 d-flex flex-column col-md-6  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Addresse :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.addresse}
                  </h2>
                </div>
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>email:</h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.email}
                  </h2>
                </div>
              </div>
              <div className="p-2 d-flex flex-row ">
                <div className="p-2 d-flex flex-column col-md-6 ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Gouvernorat :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.gouvernorat}
                  </h2>
                </div>
                <div className="p-2 d-flex flex-column col-md-6 ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Code postale :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.codePostale}
                  </h2>
                </div>
              </div>
              <div className="p-2 d-flex flex-row ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>pays :</h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.pays}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    créer en :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.createdIn.slice(0, 10)}
                  </h2>
                </div>
              </div>
              <div className="p-2 d-flex flex-row ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    choix devise
                  </h1>{" "}
                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {/* {props.data.choixDevise} */}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Choix Devise :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.choixDevise}
                  </h2>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column ml-5 col-lg-10 col-md-8 ">
              <hr style={{ width: "650px", color: "black" }} />

              <div className="d-flex justify-content-center mt-2 ">
                <h1
                  style={{
                    color: "#44548F",
                  }}
                >
                  Détails de la responsable
                </h1>
              </div>

              <div className="p-2 d-flex flex-row   ">
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Nom utilisateur:{" "}
                  </h1>
                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.nomUser}
                  </h2>
                </div>
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Prénom :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.prenomUser}
                  </h2>
                </div>
              </div>
              <div className="p-2 d-flex flex-row ">
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Genre :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.genreUser}
                  </h2>
                </div>
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Date de naissance :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.dateNaissanceUser.slice(0, 10)}
                  </h2>
                </div>
              </div>
              <div className="p-2 d-flex flex-row ">
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Addresse :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.addresseUser}
                  </h2>
                </div>

                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Email :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.emailUser}
                  </h2>
                </div>
              </div>
              <div className="p-2 d-flex flex-row ">
                <div className="p-2 d-flex flex-column col-md-6">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Numero Téléphone :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.numeroTelephoneUser}
                  </h2>
                </div>
                <div className="p-2 d-flex flex-column col-md-6"></div>
              </div>
              <div className="p-2 d-flex flex-row justify-content-center">
                <div className="p-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ borderRadius: "80px" }}
                    //     onClick={(e) => handleRefuser(e)}
                  >
                    Refuser
                  </Button>
                </div>
                <div className="p-2 ml-3">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "80px" }}
                    type="submit"
                    //onClick={(e) => handleConfirm(e)}
                  >
                    Confirmer
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
  );
}
export default EntrepriseModal;
