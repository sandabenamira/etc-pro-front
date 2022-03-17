import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addInscription } from "../../store/actions/Inscription";
import { useDispatch } from "react-redux";
import {
  isEmail,
  isPhonenumber,
  isNotEmpty,
} from "../../constants/validationFunctions";

function SignUp() {
  //state of company
  const [nom_entreprise, setNom_entreprise] = useState("");
  const [numero_serie, setNumero_serie] = useState("");
  const [addresse_entreprise, setAddresse_entreprise] = useState("");
  const [gouvernorat, setGouvernorat] = useState("");
  const [pays, setPays] = useState("");
  const [numero_telephone_entreprise, setNumero_telephone_entreprise] =
    useState();
  const [email_entreprise, setEmail_entreprise] = useState("");
  const [choix_devise, setChoix_devise] = useState("");
  const [code_postal, setCode_postal] = useState("");
  //state of user

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

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  const choisirGenre = (e) => {
    if (e === "male") {
      setGender(e.target.value);
      console.log(e.target.value);
    } else setGender(e.target.value);
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
      createdIn: new Date(dateTime),
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
      confirm: false,
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

  return (
    <div
      style={{
        backgroundColor: "#1a85b3",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "5%",
        paddingTop: "4%",
        minHeight: "1000px",
        maxWidth: "100%",
        overflow:"auto",
        position:"relative"
      }}
    >
      <div
        className="d-flex  flex-column col-lg-12 col-md-12 col-sm-12   "
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "40px 20px #125f80",
          maxWidth: "100%",
          height: "100%",
          position:"relative",

        }}
      >
        <div className="d-flex   justify-content-center mt-4  ">
          {/* /première ligne */}
          <img
            width={70}
            src={require("../../assets/images/educapProLogo.png")}
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
              fontSize: "30px",
              fontWeight: 700,
              textAlign: "center",
              position:"relative",

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
              height: "100%",
            }}
          >
            <div className="d-flex flex-wrap flex-column col-lg-6 col-md-6 col-sm-11  ">
              <div className=" d-flex justify-content-center mt-3">
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
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom* :
                  </h3>

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
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de SIRET* :
                  </h3>
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
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5 ">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse* :
                  </h3>
                  <input
                    type="text"
                    id="addresse_entreprise"
                    name="addresse_entreprise"
                    onChange={(e) => setAddresse_entreprise(e.target.value)}
                    value={addresse_entreprise}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 ">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Code Postal*
                  </h3>

                  <input
                    type="text"
                    onChange={(e) => setCode_postal(e.target.value)}
                    value={code_postal}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Gouvernorat :
                  </h3>
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
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Pays :
                  </h3>
                  <input
                    type="text"
                    id="pays"
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
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone :
                  </h3>
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
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    E-mail* :
                  </h3>

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
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5 ">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Choix de la devise* :
                  </h3>

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
                      width: "200px",
                      background: "white",
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 ">
                  <Alert
                    style={{ display: "none", height: "70px" }}
                    id="alert"
                    severity={success}
                  >
                    {alert}
                  </Alert>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1 ">
              <div className=" d-flex justify-content-start mr-5">
                <p
                  style={{
                    height: "600px",
                    borderRight: "1px solid rgba(134, 134, 134, 0.548)",
                    paddingLeft: " 2cm",
                  }}
                  className="bordure_verticale"
                ></p>
              </div>
            </div>
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-11 ">
              <div className=" d-flex justify-content-center mt-3">
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
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom* :
                  </h3>

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
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Prénom* :
                  </h3>
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
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <h3
                  style={{
                    color: "#1a85b3",
                    fontWeight: 400,
                  }}
                >
                  Vous êtes :
                </h3>

                <RadioGroup
                  className=" d-flex flex-row"
                  style={{
                    marginLeft: "30px",
                    marginTop: "-10px",
                  }}
                >
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        color="primary"
                        size="3px"
                        checked={gender === "male"}
                        onChange={choisirGenre}
                      />
                    }
                  />

                  <i
                    className="zmdi zmdi-male-alt zmdi-hc-3x"
                    style={{ color: "blue" }}
                  ></i>
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        color="primary"
                        checked={gender === "female"}
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
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Date de naissance :
                  </h3>

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
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6"></div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse :
                  </h3>
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
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6"></div>
              </div>
              <div className="d-flex flex-wrap flex-row ml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone :
                  </h3>
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
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  > 
                    E-mail* :
                  </h3>

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
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1 mt-5"></div> */}
          </div>
          <div className="d-flex   justify-content-end mb-3 mr-5">
            <button
              className="button2"
              type="reset"
              onClick={reinitialiser}
              style={{
                fontSize: "1.3rem",
                color: "#1a85b3",
                cursor: "pointer",
                backgroundColor: "#ffffff",
                padding: "5px 25px 5px 25px",
                borderRadius: "80px",
                border: "#1a85b3 solid 1px",
                marginRight: "26px",
              }}
            >
              Annuler
            </button>
            <button
              className="button1"
              type="submit"
              onClick={handleSubmit}
              style={{
                fontSize: "1.3rem",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#1a85b3",
                padding: "5px 25px 5px 25px",
                borderRadius: "80px",
                marginRight: "2cm",
              }}
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
