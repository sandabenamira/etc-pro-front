import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { editInscription } from "../../../../../store/actions/Inscription";
import "react-circular-progressbar/dist/styles.css";

function InscriptionModal(props) {
  let dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(true);
  const finalData = {
    ...props.data,
    status: "confirmé",
  };
  const finalDataRefuse = {
    ...props.data,
    status: "refusé",
  };


  const handleRefuser = (e) => {
    e.preventDefault();
    dispatch(editInscription(finalDataRefuse));
    setOpenModal(false);
  };

  const handleConfirm = (e) => {
    console.log("_____________confirme____________________", finalData);
    setOpenModal(false);
    e.preventDefault();
    dispatch(editInscription(finalData));


  };

  return (
    <Modal
      isOpen={openModal}
      // onClose={handleClose}
    >
      <ModalBody>
        <form
          className="row"
          autoComplete="off"
          style={{
            color: "#4C25B7",
            fontSize: "25px",
            // marginRight: "-10%",

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
                // style={{ width: 100, height: 100 }}
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
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>nom :</h1>

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
                  {/* {props.data.createdIn.slice(0, 10)} */}
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
                <h1 style={{ fontSize: "20px", color: "#3f51b5" }}>
                  {/* choix */}
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {/* {props.data.choixDevise} */}
                </h2>
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
            {props.data.status === "en attente" && (
              <div className="p-2 d-flex flex-row justify-content-center">
                <div className="p-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{
                      borderRadius: "80px",
                      fontSize: "18px",
                      fontFamily: " sans-serif",
                      textTransform: "none",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    onClick={(e) => handleRefuser(e)}
                  >
                    Refuser
                  </Button>
                </div>
                <div className="p-2 ml-3">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "80px",
                      fontSize: "18px",
                      fontFamily: " sans-serif",
                      textTransform: "none",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    type="submit"
                    onClick={(e) => handleConfirm(e)}
                  >
                    Confirmer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
export default InscriptionModal;
