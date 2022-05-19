import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addInscription } from "../../../store/actions/Inscription";
import { useDispatch } from "react-redux";
import { InputBase, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuItem from "@mui/material/MenuItem";
import { connect } from "react-redux";

import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
 
function SignUp(props) {
  const {
    showMessage,
    success,

    alertMessage,
  } = props;
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 767px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  let dispatch = useDispatch();

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
    nameEntreprise: "",
    serialNumberEntreprise: "",
    addressEntreprise: "",
    postalCodeEntreprise: "",
    governorateEntreprise: "",
    countryEntreprise: "",
    telephoneNumberEntreprise: "",
    emailEntreprise: "",
    choiceCurrencyEntreprise: "",
    lastNameUser: "",
    firstNameUser: "",
    genderUser: "",
    dateBirthUser: "",
    addressUser: "",
    telephoneNumberUser: "",
    emailUser: "",
  };
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

  const validationSchema = Yup.object().shape({
    nameEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un nom valide")
      .max(40, "Trop long ! maximum 40")

      .min(2, "Trop court! minimum 2"),
    serialNumberEntreprise: Yup.string()
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Entrer un numéro valide")
      .max(20, "Trop long ! maximum 20 chiffres ")
      .min(4, "Trop court ! minimum 4 chiffres"),
    addressEntreprise: Yup.string()
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une adresse valide")
      .max(40, "Trop long ! maximum 40")
      .min(2, "Trop court! minimum 2"),
    postalCodeEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Entrer un code valide")
      .max(20, "Trop long ! maximum 20 chiffres ")
      .min(4, "Trop court ! minimum 4 chiffres"),
    governorateEntreprise: Yup.string()
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un gouvernorat valide")
      .max(40, "Trop long ! maximum 40")
      .min(2, "Trop court! minimum 2"),
    countryEntreprise: Yup.string()
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une pays valide")
      .max(40, "Trop long ! maximum 40")
      .min(2, "Trop court! minimum 2"),
    telephoneNumberEntreprise: Yup.string()
      .matches(phoneRegExp, "Entrer un numéro valide")
      .max(40, "Trop long ! maximum 40 chiffres ")
      .min(6, "Trop court ! minimum 6 chiffres"),
    emailEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .email("Entrer une adresse e-mail valide  ")
      .required("Champ obligatoire !")
      .max(40, "Trop long ! maximum 40")
      .min(3, "Trop court! minimum 3"),
    choiceCurrencyEntreprise: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Entrer un Choix de la devise valide"
      )
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    lastNameUser: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un nom valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    firstNameUser: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer un prénom valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),

    dateBirthUser: Yup.date().max(new Date(), "Entrer une date valide"),
    addressUser: Yup.string()
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une adresse valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    telephoneNumberUser: Yup.string()
      .matches(phoneRegExp, "Entrer un numéro valide")
      .max(40, "Trop long !")
      .min(2, "Trop court!"),
    emailUser: Yup.string()
      .trim("Champ obligatoire !")
      .email("Entrer une adresse e-mail valide  ")
      .required("Champ obligatoire !")
      .max(40, "Trop long ! maximum 40")
      .min(3, "Trop court! minimum 3"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("helloooo", values);
      dispatch(addInscription(values));
      // setAlert("Le formulaire est envoyé avec succès! ");
      formik.resetForm({ values: "" });
    },
  });
  const handleReset = () => {
    formik.resetForm({ values: "" });
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form onSubmit={formik.handleSubmit} noValidate>
            <div
              className="d-flex flex-wrap flex-row ml-5 from-control"
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
                    className="justify-content-center col-lg-6 col-md-6 col-sm-8 form-controller"
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
                      name="nameEntreprise"
                      required
                      {...formik.getFieldProps("nameEntreprise")}
                      style={{
                        borderBottom: "1px solid  #1a85b3",
                      }}
                    />
                    {formik.touched.nameEntreprise &&
                    formik.errors.nameEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.nameEntreprise}</small>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="justify-content-center  col-lg-6 col-md-6 col-sm-8 form-controller"
                    style={{ height: "50px" }}
                  >
                    <h4
                      style={{
                        color: "#1a85b3",
                        fontWeight: 200,
                      }}
                    >
                      N° de la matricule*
                    </h4>

                    <InputBase
                      name="serialNumberEntreprise"
                      required
                      style={{
                        borderBottom: "1px solid  #1a85b3",
                      }}
                      fullWidth
                      {...formik.getFieldProps("serialNumberEntreprise")}
                    />
                    {formik.touched.serialNumberEntreprise &&
                    formik.errors.serialNumberEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.serialNumberEntreprise}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  className="d-flex flex-wrap flex-row  mt-5 form-controller "
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
                      name="countryEntreprise"
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      fullWidth
                      {...formik.getFieldProps("countryEntreprise")}
                    />
                    {formik.touched.countryEntreprise &&
                    formik.errors.countryEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.countryEntreprise}</small>
                      </div>
                    ) : null}
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
                      name="governorateEntreprise"
                      type="text"
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      fullWidth
                      {...formik.getFieldProps("governorateEntreprise")}
                    />
                    {formik.touched.governorateEntreprise &&
                    formik.errors.governorateEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.governorateEntreprise}</small>
                      </div>
                    ) : null}
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
                      name="addressEntreprise"
                      type="text"
                      required
                      fullWidth
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      {...formik.getFieldProps("addressEntreprise")}
                    />
                    {formik.touched.addressEntreprise &&
                    formik.errors.addressEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.addressEntreprise}</small>
                      </div>
                    ) : null}
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
                      name="postalCodeEntreprise"
                      required
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      fullWidth
                      {...formik.getFieldProps("postalCodeEntreprise")}
                    />
                    {formik.touched.postalCodeEntreprise &&
                    formik.errors.postalCodeEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.postalCodeEntreprise}</small>
                      </div>
                    ) : null}
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
                      name="telephoneNumberEntreprise"
                      {...formik.getFieldProps("telephoneNumberEntreprise")}
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                    {formik.touched.telephoneNumberEntreprise &&
                    formik.errors.telephoneNumberEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.telephoneNumberEntreprise}</small>
                      </div>
                    ) : null}
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
                      name="emailEntreprise"
                      required
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      {...formik.getFieldProps("emailEntreprise")}
                    />
                    {formik.touched.emailEntreprise &&
                    formik.errors.emailEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.emailEntreprise}</small>
                      </div>
                    ) : null}
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
                      name="choiceCurrencyEntreprise"
                      variant="standard"
                      {...formik.getFieldProps("choiceCurrencyEntreprise")}
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
                    {formik.touched.choiceCurrencyEntreprise &&
                    formik.errors.choiceCurrencyEntreprise ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.choiceCurrencyEntreprise}</small>
                      </div>
                    ) : null}
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
                      name="lastNameUser"
                      required
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      {...formik.getFieldProps("lastNameUser")}
                    />
                    {formik.touched.lastNameUser &&
                    formik.errors.lastNameUser ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.lastNameUser}</small>
                      </div>
                    ) : null}
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
                      name="firstNameUser"
                      required
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      {...formik.getFieldProps("firstNameUser")}
                    />
                    {formik.touched.firstNameUser &&
                    formik.errors.firstNameUser ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.firstNameUser}</small>
                      </div>
                    ) : null}
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
                    name="genderUser"
                    className=" d-flex flex-row"
                    style={{
                      marginLeft: "30px",
                      marginTop: "-10px",
                    }}
                    {...formik.getFieldProps("genderUser")}
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
                      name="dateBirthUser"
                      {...formik.getFieldProps("dateBirthUser")}
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                    />
                    {formik.touched.dateBirthUser &&
                    formik.errors.dateBirthUser ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.dateBirthUser}</small>
                      </div>
                    ) : null}
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
                      name="addressUser"
                      {...formik.getFieldProps("addressUser")}
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                    />{" "}
                    {formik.touched.addressUser && formik.errors.addressUser ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.addressUser}</small>
                      </div>
                    ) : null}
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
                      name="telephoneNumberUser"
                      {...formik.getFieldProps("telephoneNumberUser")}
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                    {formik.touched.telephoneNumberUser &&
                    formik.errors.telephoneNumberUser ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.telephoneNumberUser}</small>
                      </div>
                    ) : null}
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
                      name="emailUser"
                      required
                      style={{
                        borderBottom: "1px solid #1a85b3",
                      }}
                      {...formik.getFieldProps("emailUser")}
                    />
                    {formik.touched.emailUser && formik.errors.emailUser ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.emailUser}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-wrap align-items-start   justify-content-end  "
              style={{
                fontSize: "200%",
                fontFamilyy: "Arial, sans-serif",
                height: "70px",
              }}
            >
              <div className="col-lg-7 col-md-7 col-sm-3 mb-5 ">
                {showMessage && (
                  <Alert
                    style={{
                      height: "8%",
                      //  maxHeight: "10%",
                    }}
                    id="alert"
                    severity={success}
                  >
                    {alertMessage}
                  </Alert>
                )}
              </div>

              <div className="col-lg-2 col-md-2 col-sm-3  justify-content-end  mr">
                <Button
                  type="reset"
                  onClick={handleReset.bind(null, Formik.resetForm)}
                  style={{
                    color: "#1a85b3",
                    backgroundColor: "#ffffff",
                    padding: "2% 12% 2% 12%",
                    borderRadius: "80px",
                    border: "#1a85b3 solid 1px",
                  }}
                >
                  <span
                    style={{
                      textTransform: "none",
                      fontSize: "18px",
                      fontFamily: " sans-serif",
                    }}
                  >
                    Annuler
                  </span>
                </Button>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 justify-content-end ">
                <Button
                  // disabled={!(formik.isValid || formik.isSubmitting)}
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
                  type="submit"
                >
                  <span
                    style={{
                      textTransform: "none",
                      fontSize: "18px",
                      fontFamily: " sans-serif",
                    }}
                  >
                    Submit
                  </span>
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
          </Form>
        </Formik>
      </div>
    </div>
  );
}
const mapStateToProps = ({ Inscriptions }) => {
  const { showMessage, alertMessage, success } = Inscriptions;
  return {
    showMessage,
    alertMessage,
    success,
  };
};
export default connect(mapStateToProps, {})(SignUp);
