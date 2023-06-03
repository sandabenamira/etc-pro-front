import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addInscription } from "../../../store/actions/Inscription";
import { useDispatch } from "react-redux";
import { MenuItem, Select, FormControl, InputBase } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import { Formik, useFormik, Form } from "formik";
import Box from "@material-ui/core/Box";
import {
  validationSchema,
  initialValues,
} from "../../../constants/validationSchema";
import { ListeDevise } from "../../../constants/variables and listes";
import BootstrapInput from "../../../app/routes/Learning/routes/OnlineTraining/CostumInput";

function SignUp(props) {
  const { showMessage, success, alertMessage } = props;
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 767px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  let dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(addInscription(values));
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
            src={require("../../../assets/images/logoetcpro.png")}
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
            <strong>Créer votre compte entreprise sur ETC Pro</strong>
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
              className="d-flex flex-wrap flex-row"
              style={{
                width: "100%",
              }}
            >
              <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-12   ">
                <div className=" d-flex  justify-content-center mt-3">
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
                <div className="d-flex flex-wrap flex-column  ml-5 mt-3">
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
                      <div>
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
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
                      <div>
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
                            <small>
                              {formik.errors.serialNumberEntreprise}
                            </small>
                          </div>
                        ) : null}
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
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
                          <small>
                            {formik.errors.telephoneNumberEntreprise}
                          </small>
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
                      <h4
                        style={{
                          color: "#1a85b3",
                          fontWeight: 400,
                        }}
                      >
                        Choix de la devise*
                      </h4>
                      <FormControl fullWidth variant="outlined">
                        <Select
                          fullWidth
                          variant="outlined"
                          select
                          required
                          name="choiceCurrencyEntreprise"
                          {...formik.getFieldProps("choiceCurrencyEntreprise")}
                          // style={{
                          //   borderBottom: "1px solid #1a85b3",
                          // }}
                          input={<BootstrapInput />}
                        >
                          {ListeDevise.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>{" "}
                      </FormControl>

                      {formik.touched.choiceCurrencyEntreprise &&
                      formik.errors.choiceCurrencyEntreprise ? (
                        <div className="error" style={{ color: "red" }}>
                          <small>
                            {formik.errors.choiceCurrencyEntreprise}
                          </small>
                        </div>
                      ) : null}
                    </Grid>{" "}
                  </Grid>{" "}
                </div>
              </div>
              {matches && (
                <div className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1">
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
              <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-12 ">
                <div className=" d-flex justify-content-center mt-3 ">
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
                <div className="d-flex flex-wrap flex-column  ml-5 mt-3">
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                  </Grid>{" "}
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 4, md: 12 }}
                    sx={{ mt: 5 }}
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item xs={2} sm={2} md={3}>
                      <h4
                        style={{
                          color: "#1a85b3",
                          fontWeight: 400,
                          marginTop: "22px",
                        }}
                      >
                        Vous êtes
                      </h4>
                    </Grid>
                    <Grid item xs={10} sm={10} md={6}>
                      <RadioGroup
                        name="genderUser"
                        className=" d-flex flex-row"
                        {...formik.getFieldProps("genderUser")}
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        <FormControlLabel
                          value="masculin"
                          control={<Radio color="primary" />}
                        />

                        <i
                          className="zmdi zmdi-male-alt zmdi-hc-3x"
                          style={{ marginLeft: "-5%", color: "blue" }}
                        ></i>
                        <FormControlLabel
                          value="féminin"
                          control={
                            <Radio
                              color="primary"
                              style={{
                                marginLeft: "80%",
                              }}
                            />
                          }
                        />
                        <i
                          className="zmdi zmdi-female zmdi-hc-3x"
                          style={{ marginLeft: "5%", color: "orange" }}
                        ></i>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}></Grid>{" "}
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
                      {" "}
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
                      />
                      {formik.touched.addressUser &&
                      formik.errors.addressUser ? (
                        <div className="error" style={{ color: "red" }}>
                          <small>{formik.errors.addressUser}</small>
                        </div>
                      ) : null}
                    </Grid>{" "}
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 6, md: 12 }}
                    sx={{ m: 2 }}
                  >
                    <Grid item xs={10} sm={6} md={6}>
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
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
                      {" "}
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
                    </Grid>{" "}
                  </Grid>
                </div>
              </div>{" "}
            </div>

            <div
              className="d-flex flex-wrap align-items-start      "
              style={{
                fontSize: "200%",
                fontFamilyy: "Arial, sans-serif",
                justifyContent: 'space-between' ,
                display:"flex"
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
              <Box display="flex" justifyContent="flex-end" mb={4}  >
                <Button
                  type="reset"
                  onClick={handleReset.bind(null, Formik.resetForm)}
                  style={{
                    color: "#1a85b3",
                    backgroundColor: "#ffffff",
                    padding: "4px 22px 4px 22px",
                    borderRadius: "80px",
                    marginRight: "23px",
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
                <Button
                   style={{
                    color: "#ffffff",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#1a85b3",
                    padding: "4px 22px 4px 22px",
                    borderRadius: "80px",

                   marginRight: "23px",
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
                    Envoyer
                  </span>
                </Button>
              </Box>{" "}
          
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
