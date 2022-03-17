import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editInscription,
  addUser,
  addEntreprise,
} from "../../../../../store/actions/Inscription";
import "react-circular-progressbar/dist/styles.css";

function InscriptionModal(props) {
  let dispatch = useDispatch();
  let today = new Date().toISOString().slice(0, 10);
  const GeneratePassword = (length) => {
    const plength = length;
    const keylistalpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const keylistint = "123456789";
    const keylistspec = "!@#_+/?$%";
    let temp = "";
    let len = plength / 2;
    len -= 1;
    for (let i = 0; i < len; i += 1) {
      temp += keylistalpha.charAt(
        Math.floor(Math.random() * keylistalpha.length)
      );
    }
    for (let i = 0; i < len; i += 1) {
      temp += keylistspec.charAt(
        Math.floor(Math.random() * keylistspec.length)
      );
    }
    for (let i = 0; i < len; i += 1) {
      temp += keylistint.charAt(Math.floor(Math.random() * keylistint.length));
    }
    temp = temp
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    return temp;
  };
  const [password, setPassword] = useState(GeneratePassword(30).toString());

  const comment =
    "connecter vous avec cet email: " +
    props.data.emailUser.toString() +
    " et ce mot de passe" +
    password.toString() +
    "";
    console.log("this a comment!!!!!!!!!!",comment)
  const EntrepriseData = {
    nom: props.data.nom,
    numeroSerie: props.data.numSerie,
    codePostal: props.data.codePostale,
    gouvernorat: props.data.gouvernorat,
    pays: props.data.pays,
    numeroTelephone: props.data.numeroTelephone,
    email: props.data.email,
    choixDevise: props.data.choixDevise,
    createdIn: new Date(today),
  };
  const userData = {
    nom: props.data.nomUser,
    prenom: props.data.prenomUser,
    genre: props.data.genre,
    dateNaissance: props.data.dateNaissance,
    numeroTelephone: props.data.numeroTelephone,
    email: props.data.emailUser,
    adressePostale: props.data.addresseUser,
    role: "admine",
    createdIn: new Date(today),
    password: password,
  };
  const finalData = {
    ...props.data,
    confirm: true,
  };
  const finalDataRefuse = {
    ...props.data,
    confirm: false,
  };
  const handleRefuser = (e) => {
    e.preventDefault(); //ne pas charger formulaire au premier lieu
    dispatch(editInscription(finalDataRefuse));
  };

  const sendFeedback = (serviceID, templateId, variables) => {
    window.emailjs
      .send(serviceID, templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      .catch((err) =>
        console.error(
          "There has been an error.  Here some thoughts on the error that occured:",
          err
        )
      );
  };
  // const onSubmit = () => {

  // };
  const handleConfirm = (e) => {
    console.log("_____________confirme____________________");
    e.preventDefault();
    dispatch(editInscription(finalData));
    dispatch(addUser(userData));
    dispatch(addEntreprise(EntrepriseData));
    const templateId = "template_4tpeluy";
    const serviceID = "service_xjl8cmj";
    sendFeedback(serviceID, templateId, {
      from_name: "Educap Pro",
      reply_to: props.data.emailUser,
      message: comment,
    });

    console.log(
      "THIS IS MY CONFIRMATION addEntreprise(EntrepriseData)",
      addEntreprise(EntrepriseData)
    );
  };

  return (
    <div>
      <Modal isOpen={true}>
        <ModalBody>
          <form className="row" autoComplete="off">
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
                    Code postale :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.codePostale}
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
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
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
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Nom utilisateur:
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
                    {props.data.prenomUser}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Genre :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.genreUser}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Date de naissance :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.dateNaissanceUser}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Addresse :
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
                    onClick={(e) => handleRefuser(e)}
                  >
                    Refuser
                  </button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  align-items-start mt-0 ">
                  <button
                    style={{
                      background: "white",
                    }}
                    onClick={(e) => handleConfirm(e)}
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default InscriptionModal;
