import { Modal, ModalBody } from "reactstrap";
import "react-circular-progressbar/dist/styles.css";

function EntrepriseModal(props) {
  return (
    <Modal isOpen={true}>
      <ModalBody>
        <form
          className="row"
          autoComplete="off"
          style={{
            color: "#4C25B7",
            fontSize: "25px",
            width: "100%",
          }}
        >
          <div className="d-flex flex-column  col-lg-12 col-md-12 ">
            <div className="d-flex justify-content-end mt-2 ">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={props.opendetailsUser}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="d-flex justify-content-center mt-2 ">
              <h1
                style={{
                  color: "#3f51b5",
                }}
              >
                Détails de la société
              </h1>
            </div>

            <div className="p-2 d-flex flex-row ml-4">
              <div className="p-2 d-flex flex-column col-md-6">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>Nom :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.nameEntreprise}
                </h2>
              </div>
              <div className="p-2 d-flex flex-column col-md-6  ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Numéro Série :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.serialNumberEntreprise}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6  ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Addresse :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.addressEntreprise}
                </h2>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Choix Devise :
                </h1>
                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.choiceCurrencyEntreprise}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Gouvernorat :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.governorateEntreprise}
                </h2>
              </div>
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Code postale :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.postalCodeEntreprise}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row  ml-4">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>Pays :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.countryEntreprise}
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12  ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Créer en :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.createdIn.slice(0, 10)}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4 ">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>Email :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.emailEntreprise}
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12  ">
               </div>
            </div>
          </div>

          <div className="d-flex flex-column  col-lg-12 col-md-12 ">
            <hr style={{ width: "650px", color: "black" }} />

            <div className="d-flex justify-content-center mt-2 ">
              <h1
                style={{
                  color: "#3f51b5",
                }}
              >
                Détails de la responsable
              </h1>
            </div>

            <div className="p-2 d-flex flex-row  ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Nom utilisateur :
                </h1>
                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.firstNameUser}
                </h2>
              </div>
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>Prénom :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.lastNameUser}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>Genre :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.genderUser}
                </h2>
              </div>
              <div className="p-2 d-flex flex-column col-md-6">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Date de naissance :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.dateBirthUser}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Addresse :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.addressUser}
                </h2>
              </div>

              <div className="p-2 d-flex flex-column col-md-6">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  Numéro Téléphone :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.telephoneNumberUser}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>Email :</h1>

                <h2
                  style={{
                    fontSize: "20px",
                    color: "#8C8C8C",
                    maxWidth: "30%",
                  }}
                >
                  {props.data.emailUser}
                </h2>
              </div>

              <div className="p-2 d-flex flex-column col-md-6"></div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
export default EntrepriseModal;
