import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addInscription } from "../../../store/actions/Inscription";
import { useDispatch } from "react-redux";

import {
  isEmail,
  isPhonenumber,
  isNotEmpty,
} from "../../../constants/validationFunctions";

function SignUp() {
  const [nom_entreprise, setNom_entreprise] = useState("");
  const [numero_serie, setNumero_serie] = useState("");
  const [addresse_entreprise, setAddresse_entreprise] = useState("");
  const [gouvernorat, setGouvernorat] = useState("");
  const [pays, setPays] = useState("");
  const [numero_telephone_entreprise, setNumero_telephone_entreprise] =
    useState();
  const [email_entreprise, setEmail_entreprise] = useState();
  const [choix_devise, setChoix_devise] = useState();
  const [code_postal, setCode_postal] = useState();
  const [nom_user, setNom_user] = useState("");
  const [prenom, setPrenom] = useState("");

  const [date_naiss, setDate_naiss] = useState(new Date());
  const [adresse_user, setAdresse_user] = useState("");
  const [numero_telephone_user, setNumero_telephone_user] = useState();
  const [email_user, setEmail_user] = useState("");
  const [gender, setGender] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("error");

  let dispatch = useDispatch();

  const choisirGenre = (e) => {
    if (e.target.value === "masculin") {
      setGender("masculin");
    } else if (e.target.value === "féminin") setGender("féminin");
  };
  const reinitialiser = () => {
    document.getElementById("alert").style.display = "none";

    setNom_entreprise("");
    setNumero_serie("");
    setAddresse_entreprise("");
    setGouvernorat("");
    setPays("");
    setNumero_telephone_entreprise("");
    setEmail_entreprise("");
    setChoix_devise("");
    setCode_postal("");
    setNom_user("");
    setPrenom("");
    setDate_naiss(new Date());
    setAdresse_user("");
    setNumero_telephone_user("");
    setEmail_user("");
    setGender("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let finalData = {
      nom: nom_entreprise,
      numSerie: numero_serie,
      addresse: addresse_entreprise,
      codePostale: parseInt(code_postal),
      gouvernorat: gouvernorat,
      pays: pays,
      numeroTelephone: parseInt(numero_telephone_entreprise),
      email: email_entreprise,
      choixDevise: choix_devise,
      type: "",
      status: "",
      createdIn: new Date(),
      createdBy: 0,
      modifiedIn: new Date(),
      modifiedBy: 0,
      deleted: new Date(),
      nomUser: nom_user,
      prenomUser: prenom,
      genreUser: gender,
      dateNaissanceUser: new Date(date_naiss),
      addresseUser: adresse_user,
      numeroTelephoneUser: parseInt(numero_telephone_user),
      emailUser: email_user,
      confirm: "en attente",
    };

    if (
      isNotEmpty(nom_entreprise) &&
      isNotEmpty(numero_serie) &&
      isNotEmpty(addresse_entreprise) &&
      isNotEmpty(code_postal) &&
      isNotEmpty(choix_devise) &&
      isNotEmpty(nom_user) &&
      isNotEmpty(prenom)
    )
      if (
        isPhonenumber(numero_telephone_user) &&
        isPhonenumber(numero_telephone_entreprise)
      )
        if (isEmail(email_user) || isEmail(email_entreprise)) {
          //postInscription
          if (dispatch(addInscription(finalData)));
          {
            reinitialiser();
            setSuccess("success");
            document.getElementById("alert").style.display = "block";
            setAlert(" inscription bien enregistré !");
          }
        } else {
          setSuccess("error");
          document.getElementById("alert").style.display = "block";
          setAlert(" vous devez mettre un style mail");
        }
      else {
        setSuccess("error");

        document.getElementById("alert").style.display = "block";
        setAlert(" vous devez mettre des chiffres pour numéro du téléphone");
      }
    else {
      setSuccess("error");

      document.getElementById("alert").style.display = "block";
      setAlert(" mettez les champs obligatoires");
    }
  };
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 767px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#1a85b3",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "4%",
        minWidth: "100%",
        overflowY: "auto",
      }}
    >
      <div
        className="d-flex  flex-column col-lg-12 col-md-12 col-sm-11  "
        fullWidth
        //  fullHight
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "40px 20px #125f80",
          //      overflow:"auto",

          //        height: "1000%",
        }}
      >
        <div className="d-flex   justify-content-center mt-4  ">
          <img
            width={70}
            src={require("../../../assets/images/educapProLogo.png")}
            alt="logo"
            title="logo"
            style={{
              height: "80px",
              top: "90px",
            }}
          />
          <h1
            style={{
              color: "#1a85b3",
              maxFontSize: "40%",
              fontWeight: 700,
              textAlign: "center",
              position: "relative",
            }}
          >
            <strong>Créer votre compte entreprise sur Educap Pro</strong>
          </h1>
        </div>
        <form id="create-course-form">
          <div
            className="d-flex flex-wrap flex-row  "
            style={{
              width: "100%",
            }}
          >
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-11  ">
              <div className=" d-flex  justify-content-center mt-2">
                <div className="title">
                  <h1
                    className="Accueil"
                    style={{
                      color: "#1a85b3",
                      fontSize: "24px",
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    <strong>Votre société</strong>
                  </h1>
                </div>
              </div>
              <div className="d-flex  flex-wrap flex-row ml-5  mt-3">
                <div className="justify-content-center col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom de la société*
                  </h4>

                  <input
                    type="text"
                    id="nom_entreprise"
                    name="nom_entreprise"
                    onChange={(e) => setNom_entreprise(e.target.value)}
                    value={nom_entreprise}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
                <div className="justify-content-center  col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 200,
                    }}
                  >
                    N° de série*
                  </h4>
                  <input
                    type="text"
                    id="numero_serie"
                    name="numero_serie"
                    onChange={(e) => setNumero_serie(e.target.value)}
                    value={numero_serie}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5 ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Pays
                  </h4>
                  <input
                    type="text"
                    name="pays"
                    onChange={(e) => setPays(e.target.value)}
                    value={pays}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 300,
                    }}
                  >
                    Gouvernorat
                  </h4>

                  <input
                    type="text"
                    onChange={(e) => setGouvernorat(e.target.value)}
                    value={gouvernorat}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse de la société*
                  </h4>
                  <input
                    type="text"
                    onChange={(e) => setAddresse_entreprise(e.target.value)}
                    value={addresse_entreprise}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Code Postal*
                  </h4>
                  <input
                    type="text"
                    id="pays"
                    name="pays"
                    onChange={(e) => setCode_postal(e.target.value)}
                    value={code_postal}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone
                  </h4>
                  <input
                    type="text"
                    id="numero_telephone_entreprise"
                    name="numero_telephone_entreprise"
                    onChange={(e) =>
                      setNumero_telephone_entreprise(e.target.value)
                    }
                    value={numero_telephone_entreprise}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    E-mail*
                  </h4>

                  <input
                    type="mail"
                    id="email_entreprise"
                    name="email_entreprise"
                    onChange={(e) => setEmail_entreprise(e.target.value)}
                    value={email_entreprise}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5 ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Choix de la devise*
                  </h4>

                  <select
                    required
                    value={choix_devise}
                    onChange={(e) => setChoix_devise(e.target.value)}
                    //   components={{ Option: IconOption }}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      color: "#000000",
                      borderBottom: "1px solid #1a85b3",
                      background: "white",
                      minWidth: "70%",
                      maxWidth: "70%",
                    }}
                  >
                    <option value=""></option>

                    <option value="Dollar">{"\u0024"} Dollar</option>
                    <option value="Euro"> {"\u20AC"} Euro</option>
                    <option value="Yen"> {"\u00A5"} Yen</option>
                    <option value="DT">DT</option>
                  </select>
                </div>
              </div>
            </div>
            {matches && (
              <div className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1">
                <div className=" d-flex justify-content-end  ">
                  <p
                    style={{
                      height: "600px",
                      //    minHeight:"600px",
                      borderRight: "1px solid rgba(134, 134, 134, 0.548)",
                      //  paddingLeft: " 3%",
                    }}
                    className="bordure_verticale"
                  ></p>
                </div>
              </div>
            )}
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-12">
              <div className=" d-flex justify-content-center mt-2 ">
                <div className="title">
                  <h1
                    className="Accueil"
                    style={{
                      color: "#1a85b3",
                      fontSize: "24px",
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    <strong>Vos coordonnées</strong>
                  </h1>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row  ml-5 mt-3 ">
                <div className="col-lg-6 col-md-6 col-sm-12 ">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom*
                  </h4>

                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    onChange={(e) => setNom_user(e.target.value)}
                    value={nom_user}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",

                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 ">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Prénom*
                  </h4>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    onChange={(e) => setPrenom(e.target.value)}
                    value={prenom}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex  flex-wrap flex-row ml-5 mt-4 ">
                <h4
                  style={{
                    color: "#1a85b3",
                    fontWeight: 400,
                    marginLeft: "3.5%",
                    marginTop:"4%"
                  }}
                >
                  Vous êtes
                </h4>

                <RadioGroup
                  className=" d-flex flex-row"
                  style={{
                    marginLeft: "30px",
                    marginTop: "-10px",
                  }}
                >
                  <FormControlLabel
                    value="masculin"
                    control={
                      <Radio
                        color="primary"
                        checked={gender === "masculin"}
                        onChange={choisirGenre}
                      />
                    }
                  />

                  <i
                    className="zmdi zmdi-male-alt zmdi-hc-3x"
                    style={{ color: "blue" }}
                  ></i>
                  <FormControlLabel
                    value="féminin"
                    control={
                      <Radio
                        color="primary"
                        checked={gender === "féminin"}
                        onChange={choisirGenre}
                        style={{
                          marginLeft: "1cm",
                        }}
                      />
                    }
                  />
                  <i
                    className="zmdi zmdi-female zmdi-hc-3x"
                    style={{ color: "orange" }}
                  ></i>
                </RadioGroup>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-4">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                   
                    }}
                  >
                    Date de naissance
                  </h4>

                  <input
                    type="date"
                    name="date_naiss"
                    onChange={(e) => setDate_naiss(e.target.value)}
                    value={date_naiss}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                    min="1900-01-01" max="2200-12-31"

                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12"></div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-4">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse
                  </h4>
                  <input
                    type="text"
                    id="adresse_user"
                    name="adresse_user"
                    onChange={(e) => setAdresse_user(e.target.value)}
                    value={adresse_user}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12"></div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone
                  </h4>
                  <input
                    type="text"
                    name="phone"
                    onChange={(e) => setNumero_telephone_user(e.target.value)}
                    value={numero_telephone_user}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    E-mail*
                  </h4>

                  <input
                    type="mail"
                    id="email_user "
                    name="email_user "
                    onChange={(e) => setEmail_user(e.target.value)}
                    value={email_user}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                      minWidth: "40%",
                      maxWidth: "70%",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1 mt-5"></div> */}
          </div>
          <div className="d-flex  flex-wrap  justify-content-end mt-3  ">
            <div className="col-lg-6 col-md-6 col-sm-12  ">
              {/* {!matches && ( */}
              <Alert
                style={{
                  display: "none",
                  maxHeight: "70px",
                  // maxWidth: "100%",
                }}
                id="alert"
                severity={success}
              >
                {alert}
              </Alert>
              {/* )} */}
            </div>

            <div className="col-lg-2 col-md-3 col-sm-2  mr mt-4 ">
              <button
                className="button2"
                type="reset"
                onClick={reinitialiser}
                style={{
                  fontSize: "150%",
                  color: "#1a85b3",
                  cursor: "pointer",
                  backgroundColor: "#ffffff",
                  padding: "2% 12% 2% 12%",
                  borderRadius: "80px",
                  border: "#1a85b3 solid 1px",
                }}
              >
                Annuler
              </button>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-2 justify-content-end  mt-4 ">
              <button
                className="button1"
                type="submit"
                onClick={handleSubmit}
                style={{
                  fontSize: "150%",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#1a85b3",
                  padding: "2% 12% 2% 12%",
                  borderRadius: "80px",
                  marginRight: "13%",
                  marginBottom: "5%",
                }}
              >
                Suivant
              </button>
            </div>
            {/* {!matches && (
              <div className=" col-sm-5">
            <Alert
                  style={{
                    display: "none",
                    maxHeight: "70px",
                    // maxWidth: "100%",
                  }}
                  id="alert"
                  severity={success}
                >
                  {alert}
                </Alert>
              </div>
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
