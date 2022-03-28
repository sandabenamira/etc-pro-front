import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addInscription } from "../../../store/actions/Inscription";
import { useDispatch } from "react-redux";
import { InputBase, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import NativeSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import {
  isEmail,
  isPhonenumber,
  isNotEmpty,
} from "../../../constants/validationFunctions";

function SignUp() {
  let dispatch = useDispatch();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 767px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const ListeDevise = [
    {
      value: "Dollar",
      label: "Dollar",
    },
    {
      value: "Euro",
      label: "Euro",
    },
    {
      value: "Yen",
      label: "Yen",
    },
    {
      value: "DT",
      label: "DT",
    },
  ];
  const initialValues = {
    nomE: "",
    numero_serie: "",
    addresse_entreprise: "",
    code_postal: "",

    gouvernorat: "",
    pays: "",
    numero_telephone_entreprise: "",
    email_entreprise: "",
    choixDevise: "",
    nom_user: "",
    prenom: "",
    dateNaiss: "",
    adresse_user: "",
    numero_telephone_user: "",
    emailUU: "",
    gender: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChangee = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    //  console.log(formValues);
  };

  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("error");

  const reinitialiser = () => {
    document.getElementById("alert").style.display = "none";
    setFormValues(initialValues);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   //   let Data = {
  //   //     nom: formValues.nomE,
  //   //     numSerie: formValues.numero_serie,
  //   //     addresse: formValues.addresse_entreprise,
  //   //     codePostale: formValues.code_postal,
  //   //     gouvernorat: formValues.gouvernorat,
  //   //     pays: formValues.pays,
  //   //     numeroTelephone: formValues.numero_telephone_entreprise,
  //   //     email: formValues.email_entreprise,
  //   //     choixDevise: formValues.choixDevise,
  //   //     type: "",
  //   //     status: "",
  //   //     createdIn: new Date(),
  //   //     createdBy: 0,
  //   //     modifiedIn: new Date(),
  //   //     modifiedBy: 0,
  //   //     deleted: new Date(),
  //   //     nomUser: formValues.nom_user,
  //   //     prenomUser: formValues.prenom,
  //   //     genreUser: formValues.gender,
  //   //     dateNaissanceUser: formValues.dateNaiss,
  //   //     addresseUser: formValues.adresse_user,
  //   //     numeroTelephoneUser: formValues.numero_telephone_user,
  //   //     emailUser: formValues.emailUU,
  //   //     confirm: "en attente",
  //   //   };

  //   // //  console.log(Data);

  //   //   if (
  //   //     isNotEmpty(formValues.nomE) &&
  //   //     isNotEmpty(formValues.numero_serie) &&
  //   //     isNotEmpty(formValues.addresse_entreprise) &&
  //   //     isNotEmpty(formValues.code_postal) &&
  //   //     isNotEmpty(formValues.choixDevise) &&
  //   //     isNotEmpty(formValues.nom_user) &&
  //   //     isNotEmpty(formValues.prenom)
  //   //   )
  //   //     if (
  //   //       isPhonenumber(formValues.numero_telephone_user) &&
    //       isPhonenumber(formValues.numero_telephone_entreprise)
  //   //     )
  //   //       if (
  //   //         isEmail(formValues.emailUU) ||
  //   //         isEmail(formValues.email_entreprise)
  //   //       ) {
  //   //         //postInscription
  //   //         if (dispatch(addInscription(Data)));
  //   //         {
  //   //           reinitialiser();
  //   //           setSuccess("success");
  //   //           document.getElementById("alert").style.display = "block";
  //   //           setAlert(" inscription bien enregistré !");
  //   //         }
  //   //       } else {
  //   //         setSuccess("error");
  //   //         document.getElementById("alert").style.display = "block";
  //   //         setAlert(" vous devez mettre un style mail");
  //   //       }
  //   //     else {
  //   //       setSuccess("error");

  //   //       document.getElementById("alert").style.display = "block";
  //   //       setAlert(" vous devez mettre des chiffres pour numéro du téléphone");
  //   //     }
  //   //   else {
  //   //     setSuccess("error");

  //   //     document.getElementById("alert").style.display = "block";
  //   //     setAlert(" mettez les champs obligatoires");
  //   //   }
  // };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (setIsSubmit(true));
   { let Data = {
          nom: formValues.nomE,
          numSerie: formValues.numero_serie,
          addresse: formValues.addresse_entreprise,
          codePostale: formValues.code_postal,
          gouvernorat: formValues.gouvernorat,
          pays: formValues.pays,
          numeroTelephone: formValues.numero_telephone_entreprise,
          email: formValues.email_entreprise,
          choixDevise: formValues.choixDevise,
          type: "",
          status: "",
          createdIn: new Date(),
          createdBy: 0,
          modifiedIn: new Date(),
          modifiedBy: 0,
          deleted: new Date(),
          nomUser: formValues.nom_user,
          prenomUser: formValues.prenom,
          genreUser: formValues.gender,
          dateNaissanceUser: formValues.dateNaiss,
          addresseUser: formValues.adresse_user,
          numeroTelephoneUser: formValues.numero_telephone_user,
          emailUser: formValues.emailUU,
          confirm: "en attente",
        };
        dispatch(addInscription(Data))
      
      
      }
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  });
  const validate = (values) => {
    const errors = {};
    if (!values.nomE) {
      errors.nomE = "champ requis ! ";
    }

    if (!values.numero_serie) {
      errors.numero_serie = "champ requis ! ";
    }
    if (!values.addresse_entreprise) {
      errors.addresse_entreprise = "champ requis ! ";
    }
    if (!values.code_postal) {
      errors.code_postal = "champ requis ! ";
    }

    if (!values.email_entreprise) {
      errors.email_entreprise = "champ requis ! ";
    } 
    if (!values.choixDevise) {
      errors.choixDevise = "champ requis ! ";
    }
    if (!values.nom_user) {
      errors.nom_user = "champ requis ! ";
    } 
    if (!values.prenom) {
      errors.prenom = "champ requis ! ";
    }
    if (!values.emailUU) {
      errors.emailUU = "champ requis ! ";
    }
    return errors;
  };

  return (
    <div
      style={{
        backgroundColor: "#1a85b3",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "4%",
        minWidth: "100%",
        overflow: "auto",
      }}
    >
      <div
        className="d-flex  flex-column col-lg-12 col-md-12 col-sm-11  "
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
        <form onSubmit={handleSubmit}>
          <div
            className="d-flex flex-wrap flex-row ml-5"
            style={{
              width: "80%",
            }}
          >
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-12  ">
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
              <div className="d-flex  flex-wrap flex-row   mt-3">
                <div className="justify-content-center col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom de la société*
                  </h4>
                  <p style={{ fontSize: "70%", color: "red" }}></p>

                  <InputBase
                    fullWidth
                    name="nomE"
                    onChange={handleChangee}
                    value={formValues.nomE}
                    required
                    style={{
                      borderBottom: "2px solid  #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.nomE}
                  </p>
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

                  <InputBase
                    helperText="Incorrect entry."
                    type="text"
                    name="numero_serie"
                    onChange={handleChangee}
                    value={formValues.numero_serie}
                    required
                    style={{
                      borderBottom: "2px solid  #1a85b3",
                    }}
                    fullWidth
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.numero_serie}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row  mt-5 ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Pays
                  </h4>
                  <InputBase
                    type="text"
                    name="pays"
                    onChange={handleChangee}
                    value={formValues.pays}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                    fullWidth
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

                  <InputBase
                    name="gouvernorat"
                    type="text"
                    onChange={handleChangee}
                    value={formValues.gouvernorat}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                    fullWidth
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse de la société*
                  </h4>
                  <InputBase
                    name="addresse_entreprise"
                    type="text"
                    onChange={handleChangee}
                    value={formValues.addresse_entreprise}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                    fullWidth
                    required
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.addresse_entreprise}
                  </p>
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
                  <InputBase
                    type="text"
                    name="code_postal"
                    onChange={handleChangee}
                    value={formValues.code_postal}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                    fullWidth
                    required
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.code_postal}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone
                  </h4>
                  <InputBase
                    fullWidth
                    type="text"
                    name="numero_telephone_entreprise"
                    onChange={handleChangee}
                    value={formValues.numero_telephone_entreprise}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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

                  <InputBase
                    fullWidth
                    type="mail"
                    name="email_entreprise"
                    onChange={handleChangee}
                    value={formValues.email_entreprise}
                    required
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.email_entreprise}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row mt-5 ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Choix de la devise*
                  </h4>

                  <TextField
                    fullWidth
                    select
                    required
                    name="choixDevise"
                    variant="standard"
                    value={formValues.choixDevise}
                    onChange={handleChangee}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                  >
                    {ListeDevise.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.choixDevise}
                  </p>
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
                      borderRight: "2px solid rgba(134, 134, 134, 0.548)",
                      //  paddingLeft: " 3%",
                    }}
                    className="bordure_verticale"
                  ></p>
                </div>
              </div>
            )}
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-11">
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
              <div className="d-flex flex-wrap flex-row  mt-3 ">
                <div className="col-lg-6 col-md-6 col-sm-12 ">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom*
                  </h4>

                  <InputBase
                    fullWidth
                    type="text"
                    name="nom_user"
                    onChange={handleChangee}
                    value={formValues.nom_user}
                    required
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.nom_user}
                  </p>
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
                  <InputBase
                    fullWidth
                    type="text"
                    name="prenom"
                    onChange={handleChangee}
                    value={formValues.prenom}
                    required
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.prenom}
                  </p>
                </div>
              </div>
              <div className="d-flex  flex-wrap flex-rowml-5 mt-4 ">
                <h4
                  style={{
                    color: "#1a85b3",
                    fontWeight: 400,
                    marginLeft: "3.5%",
                    marginTop: "4%",
                  }}
                >
                  Vous êtes
                </h4>

                <RadioGroup
                  name="gender"
                  className=" d-flex flex-row"
                  style={{
                    marginLeft: "30px",
                    marginTop: "-10px",
                  }}
                  value={formValues.gender}
                  onChange={handleChangee}
                >
                  <FormControlLabel
                    value="masculin"
                    control={<Radio color="primary" />}
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
              <div className="d-flex flex-wrap flex-rowml-5 mt-4">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Date de naissance
                  </h4>

                  <InputBase
                    fullWidth
                    type="date"
                    name="dateNaiss"
                    onChange={handleChangee}
                    value={formValues.dateNaiss}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                    // min="2022-01-01"
                    // max={h}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12"></div>
              </div>
              <div className="d-flex flex-wrap flex-rowml-5 mt-4">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse
                  </h4>
                  <InputBase
                    fullWidth
                    type="text"
                    name="adresse_user"
                    onChange={handleChangee}
                    value={formValues.adresse_user}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12"></div>
              </div>
              <div className="d-flex flex-wrap flex-rowml-5 mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h4
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone
                  </h4>
                  <InputBase
                    fullWidth
                    type="text"
                    name="numero_telephone_user"
                    onChange={handleChangee}
                    value={formValues.numero_telephone_user}
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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

                  <InputBase
                    fullWidth
                    type="mail"
                    name="emailUU"
                    onChange={handleChangee}
                    value={formValues.emailUU}
                    required
                    style={{
                      borderBottom: "2px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.emailUU}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex  flex-wrap  justify-content-end mt-3  
           "
            style={{
              fontSize: "200%",
              fontFamilyy: "Arial, sans-serif",
            }}
          >
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
              <Button
                className="button2"
                type="reset"
                onClick={reinitialiser}
                style={{
                  color: "#1a85b3",
                  backgroundColor: "#ffffff",
                  padding: "2% 12% 2% 12%",
                  borderRadius: "80px",
                  border: "#1a85b3 solid 2px",
                }}
              >
                Annuler
              </Button>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-2 justify-content-end  mt-4 ">
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{
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
              </Button>
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
