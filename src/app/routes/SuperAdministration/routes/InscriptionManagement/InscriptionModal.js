import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { editInscription } from "../../../../../store/actions/Inscription";
import "react-circular-progressbar/dist/styles.css";
import { addUser } from "../../../../../store/actions/User";
import { addEntreprise } from "../../../../../store/actions/Entreprise";

function InscriptionModal(props) {
  let dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(true);
  const finalData = {
    ...props.data,
    confirm: "confirmé",
  };
  const finalDataRefuse = {
    ...props.data,
    confirm: "refusé",
  };
  const EntrepriseData = {
    nom: props.data.nom,
    numSerie: props.data.numSerie,
    addresse: props.data.addresse,
    codePostale: props.data.codePostale,
    gouvernorat: props.data.gouvernorat,
    pays: props.data.pays,
    numeroTelephone: props.data.numeroTelephone,
    email: props.data.email,
    choixDevise: props.data.choixDevise,
    createdIn: props.data.createdIn,
  };
  const userData = {
    nom: props.data.nomUser,
    prenom: props.data.prenomUser,
    genre: props.data.genreUser,
    dateNaissance: props.data.dateNaissanceUser,
    numeroTelephone: props.data.numeroTelephoneUser,
    email: props.data.emailUser,
    adressePostale: props.data.addresseUser,
    role: "admine",
    createdIn: props.data.createdIn,
    archive: false,
    // password: password,
  };
  // const comment =
  //   "connecter vous avec cet email: " +
  //   props.data.emailUser.toString() +
  //   " et ce mot de passe" +
  //   props.data.password.toString() +
  //   "";

  // const sendFeedback = (serviceID, templateId, variables) => {
  //   window.emailjs
  //     .send(serviceID, templateId, variables)
  //     .then((res) => {
  //       console.log("Email successfully sent!");
  //     })
  //     .catch((err) =>
  //       console.error(
  //         "There has been an error.  Here some thoughts on the error that occured:",
  //         err
  //       )
  //     );
  // };
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
    dispatch(addUser(userData));
    dispatch(addEntreprise(EntrepriseData));
    // const templateId = "template_4tpeluy";
    // const serviceID = "service_xjl8cmj";
    // sendFeedback(serviceID, templateId, {
    //   from_name: "Educap Pro",
    //   reply_to: props.data.emailUser,
    // message: comment,
    //  });
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
                  color: "#44548F",
                }}
              >
                Détails de la société
              </h1>
            </div>

            <div className="p-2 d-flex flex-row ml-4">
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
            <div className="p-2 d-flex flex-row ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  Addresse :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.addresse}
                </h2>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  Choix Devise :
                </h1>
                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.choixDevise}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4">
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
            <div className="p-2 d-flex flex-row  ml-4">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>Pays :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.pays}
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  Créer en :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.createdIn.slice(0, 10)}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6 flex-wrap">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>Email :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.email}
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
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
                  color: "#44548F",
                }}
              >
                Détails de la responsable
              </h1>
            </div>

            <div className="p-2 d-flex flex-row  ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  Nom utilisateur :
                </h1>
                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.nomUser}
                </h2>
              </div>
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>Prénom :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.prenomUser}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4 ">
              <div className="p-2 d-flex flex-column col-md-6">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>Genre :</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.genreUser}
                </h2>
              </div>
              <div className="p-2 d-flex flex-column col-md-6">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  Date de naissance :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.dateNaissanceUser}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4 ">
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
                  Numéro Téléphone :
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {props.data.numeroTelephoneUser}
                </h2>
              </div>
            </div>
            <div className="p-2 d-flex flex-row ml-4">
              <div className="p-2 d-flex flex-column col-md-6 ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>Email :</h1>

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
            {props.data.confirm === "en attente" && (
              <div className="p-2 d-flex flex-row justify-content-center">
                <div className="p-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ borderRadius: "80px" }}
                    onClick={(e) => handleRefuser(e)}
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
