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
  const validate = (values) => {
    const errors = {};
    if (!isNotEmpty(values.nomE)) {
      errors.nomE = "champ requis ! ";
    }

    if (!isNotEmpty(values.numero_serie)) {
      errors.numero_serie = "champ requis !";
    }
    if (!isNotEmpty(values.addresse_entreprise)) {
      errors.addresse_entreprise = "champ requis ! ";
    }
    if (!isNotEmpty(values.code_postal)) {
      errors.code_postal = "champ requis ! ";
    }

    if (!isNotEmpty(formValues.numero_telephone_entreprise)) {
      errors.numero_telephone_entreprise = "champ requis ! ";
    } else if (!isPhonenumber(formValues.numero_telephone_entreprise)) {
      errors.numero_telephone_entrepriseForme =
        "Veuillez renseigner un numéro de téléphone de 8 chiffres ! ";
    }
    if (!isNotEmpty(formValues.numero_telephone_user)) {
      errors.numero_telephone_user = "champ requis ! ";
    } else if (!isPhonenumber(formValues.numero_telephone_user)) {
      errors.numero_telephone_userForme =
        "Veuillez renseigner un numéro de téléphone de 8 chiffres ! ";
    }
    if (!isNotEmpty(values.email_entreprise)) {
      errors.email_entreprise = "champ requis !  ";
    } else if (!isEmail(formValues.email_entreprise)) {
      errors.email_entrepriseForme =
        "Veuillez entrer une adresse e-mail valide ! ";
    }
    if (!isNotEmpty(values.choixDevise)) {
      errors.choixDevise = "champ requis !  ";
    }
    if (!isNotEmpty(values.nom_user)) {
      errors.nom_user = "champ requis !";
    }
    if (!isNotEmpty(values.prenom)) {
      errors.prenom = "champ requis ! ";
    }
    if (!isNotEmpty(values.emailUU)) {
      errors.emailUU = "champ requis ! ";
    } else if (!isEmail(formValues.emailUU)) {
      errors.emailUUForme = "Veuillez entrer une adresse e-mail valide";
    }
    return errors;
  };
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
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("error");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmit2, setIsSubmit2] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit && isSubmit2) {
      setAlert("Le formulaire est envoyé avec succès! ");
      setSuccess("success");
    } else if (Object.keys(formErrors).length === 0 && isSubmit) {
      setAlert("Le formulaire non envoyé ");
      setSuccess("error");
    } else if (Object.keys(formErrors).length > 0) {
      setAlert("les champs du fomulaire non satisfés");
      setSuccess("error");
    }
  });

  const handleChangee = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // console.log(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);

    setFormErrors(validate(formValues));

    let error = validate(formValues);

    if (Object.keys(error).length === 0) {
      setIsSubmit(true);

      let Data = {
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
      // setShow(false);
      setIsSubmit2(true);
      setShow(true);

      dispatch(addInscription(Data));
    }
    setFormValues(initialValues);

    // setShow(true);
  };

  const reinitialiser = () => {
    setFormValues(initialValues);
    setShow(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#1a85b3",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "4%",
        minWidth: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <div
        className="d-flex  flex-column col-lg-12 col-md-12 col-sm-11  "
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "50px 20px #125f80",
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
              width: "100%",
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
              <div
                className="d-flex  flex-wrap flex-row   mt-3 "
                style={{ height: "50px" }}
              >
                <div
                  className="justify-content-center col-lg-6 col-md-6 col-sm-8"
                  style={{ height: "50px" }}
                >
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
                    name="nomE"
                    onChange={handleChangee}
                    value={formValues.nomE}
                    required
                    style={{
                      borderBottom: "1px solid  #1a85b3",
                    }}
                    helperText="Please enter your name"
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.nomE}
                  </p>
                </div>
                <div
                  className="justify-content-center  col-lg-6 col-md-6 col-sm-8"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid  #1a85b3",
                    }}
                    fullWidth
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.numero_serie}
                  </p>
                </div>
              </div>
              <div
                className="d-flex flex-wrap flex-row  mt-5 "
                style={{ height: "50px" }}
              >
                <div className="col-lg-6 col-md-6 col-sm-8 mt-2">
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                    fullWidth
                  />
                </div>
                <div
                  className="col-lg-6 col-md-6 col-sm-8 mt-2"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                    fullWidth
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row mt-5">
                <div
                  className="col-lg-6 col-md-6 col-sm-8"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                    fullWidth
                    required
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.addresse_entreprise}
                  </p>
                </div>
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
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
              <div
                className="d-flex flex-wrap flex-row mt-5"
                style={{ height: "50px" }}
              >
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.numero_telephone_entrepriseForme}
                  </p>
                </div>
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ height: "50px" }}
                >
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
                    type="email"
                    name="email_entreprise"
                    onChange={handleChangee}
                    value={formValues.email_entreprise}
                    required
                    style={{
                      borderBottom: "1px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.email_entreprise}
                    {formErrors.email_entrepriseForme}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-row mt-5 ">
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
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
              <div
                className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1"
                style={{ marginRight: "2%" }}
              >
                <div className=" d-flex justify-content-end  ">
                  <p
                    style={{
                      height: "570px",
                      //    minHeight:"600px",
                      borderRight: "1px solid rgba(134, 134, 134, 0.548)",
                      //  paddingLeft: " 3%",
                    }}
                    className="bordure_verticale"
                  ></p>
                </div>
              </div>
            )}
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-11 ">
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
                <div
                  className="col-lg-6 col-md-6 col-sm-12 "
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.nom_user}
                  </p>
                </div>
                <div
                  className="col-lg-6 col-md-6 col-sm-12 "
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.prenom}
                  </p>
                </div>
              </div>
              <div
                className="d-flex  flex-wrap flex-rowml-5 mt-5"
                style={{ height: "60px" }}
              >
                <h4
                  style={{
                    color: "#1a85b3",
                    fontWeight: 400,
                    marginLeft: "2%",
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
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ height: "80px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                    // min="2022-01-01"
                    // max={h}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12"></div>
              </div>
              <div className="d-flex flex-wrap flex-rowml-5 mt-4">
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12"></div>
              </div>
              <div className="d-flex flex-wrap flex-rowml-5 mt-5">
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ height: "50px" }}
                >
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
                      borderBottom: "1px solid #1a85b3",
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.numero_telephone_userForme}
                  </p>
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
                    type="email"
                    name="emailUU"
                    onChange={handleChangee}
                    value={formValues.emailUU}
                    required
                    style={{
                      borderBottom: "1px solid #1a85b3",
                    }}
                  />
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {formErrors.emailUU}
                    {formErrors.emailUUForme}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-wrap align-items-start   justify-content-end  "
            style={{
              fontSize: "200%",
              fontFamilyy: "Arial, sans-serif",height:"70px"
            }}
          >
            <div className="col-lg-7 col-md-7 col-sm-3 mb-5 ">
              {/* {!matches && ( */}
              {show && (
                <Alert
                  style={{
                    height:"8%"
                  //  maxHeight: "10%",
                  }}
                  id="alert"
                  severity={success}
                >
                  {alert}
                </Alert>
              )}
            </div>

            <div className="col-lg-2 col-md-2 col-sm-3  justify-content-end  mr">
              <Button
                className="button2"
                type="reset"
                onClick={reinitialiser}
                style={{
                  color: "#1a85b3",
                  backgroundColor: "#ffffff",
                  padding: "2% 12% 2% 12%",
                  borderRadius: "80px",
                  border: "#1a85b3 solid 1px",
                }}
              >
                Annuler
              </Button>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 justify-content-end ">
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
                  // marginBottom: "5%",
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
