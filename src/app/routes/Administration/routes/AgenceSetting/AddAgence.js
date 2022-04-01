import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import { addAgence } from "../../../../../store/actions/Agence";
import MenuItem from "@mui/material/MenuItem";
import {
  isEmail,
  isPhonenumber,
  isStringDate,
  isNotEmpty,
} from "../../../../../constants/validationFunctions";
export default function AddAgence(props) {
  let dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};
    if (!isNotEmpty(values.nom)) {
      errors.nom = "champ requis ! ";
    }

    if (!isNotEmpty(values.type)) {
      errors.type = "champ requis ! ";
    }
    if (!isNotEmpty(values.gouvernorat)) {
      errors.gouvernorat = "champ requis ! ";
    }
    if (!isNotEmpty(values.adresse)) {
      errors.adresse = "champ requis ! ";
    }

    if (!isNotEmpty(values.email)) {
      errors.email = "champ requis ! ";
    } else if (!isEmail(formValues.email)) {
      errors.emailForme = " Veuillez entrer une adresse e-mail valide ! ";
    }

    if (!isNotEmpty(values.fax)) {
      errors.fax = "champ requis ! ";
    } else if (!isPhonenumber(formValues.fax)) {
      errors.faxForme = "Veuillez entrer un numéro de Fax de 8 chiffres ! ";
    }
    if (!isNotEmpty(values.numeroTel)) {
      errors.numeroTel = "champ requis ! ";
    } else if (!isPhonenumber(formValues.numeroTel)) {
      errors.numeroTelForme =
        "Veuillez entrer un numéro de Téléphone de 8 chiffres ! ";
    }
    return errors;
  };
  const typeList = [
    {
      value: "BIAT Sousse",
      label: "BIAT Sousse",
    },
    {
      value: "BIAT Sfax",
      label: "BIAT Sfax",
    },
    {
      value: "BIAT Tunis",
      label: "BIAT Tunis",
    },
  ];

  const gouvernoratList = [
    {
      value: "Sousse",
      label: " Sousse",
    },
    {
      value: " Sfax",
      label: " Sfax",
    },
    {
      value: "Tunis",
      label: " Tunis",
    },
  ];
  const initialValues = {
    nom: "",
    type: "",
    gouvernorat: "",
    fax: "",
    numeroTel: "",
    adresse: "",
    email: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [alert, setAlert] = useState("les champs non satisfés");
  const [success, setSuccess] = useState("error");
  const [isSubmit2, setIsSubmit2] = useState(false);
  const [show, setShow] = useState(false);

  const handleChangee = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);

    setFormErrors(validate(formValues));
    let error = validate(formValues);

    if (Object.keys(error).length === 0) {
      setIsSubmit(true);
      let finalData = {
        nom: formValues.nom,
        type: formValues.type,
        gouvernorat: formValues.gouvernorat,
        adresse: formValues.adresse,
        email: formValues.email,
        fax: parseInt(formValues.fax),
        numeroTel: parseInt(formValues.numeroTel),
        createdIn: isStringDate(new Date()),
        modifiedIn: isStringDate(new Date()),
        archive: false,
      };
      setShow(true);
      setIsSubmit2(true);
      dispatch(addAgence(finalData));
      props.openaddAgence();

    }
    /// setShow(true);
  };

  const handleCancel = (e) => {
    props.openaddAgence();
  };

  return (
    <Modal isOpen={props.openaddAgence}>
      <ModalBody>
        <form className="row" autoComplete="off">
          <div className="d-flex flex-column col-lg-12 col-md-12 ">
            <div
              className="d-flex justify-content-end mt-2 "
              style={{
                color: "#4C25B7",
                fontSize: "25px",
              }}
            >
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={props.openaddAgence}
                style={{
                  marginTop: "-2%",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="d-flex flex-row justify-content-center mb-5">
              <div
                className="d-flex justify-content-center  col-lg-11 col-md-11 col-sm-11 "
                style={{ color: "#3f51b5", fontSize: "25px" }}
              >
                <IntlMessages id="gestion.agence.add.agency" />
              </div>

              <br />
              <br />
            </div>
            <div
              className="p-2 d-flex flex-row  "
              style={{ height: "120px", marginLeft: "40px" }}
            >
              <div className="p-2 d-flex flex-column col-md-5  ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.agency" />*
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    name="nom"
                    size="small"
                    fullWidth
                    onChange={handleChangee}
                    value={formValues.nom}
                    required
                  ></TextField>
                  <div className="text-danger ">
                    <small>{formErrors.nom}</small>
                  </div>
                </div>
              </div>

              <div
                className="p-2 d-flex flex-column col-md-5  "
                style={{ width: "50px", marginLeft: "80px" }}
              >
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.agency.type" />*
                </div>
                {/* <TextField
                    className="textfield"
                    select
                    name="type"
                    margin="normal"
                    fullWidth
                    onChange={handleChangee}
                    value={formValues.type}
                    required
                  > */}
                <TextField
                  className="textfield"
                  select
                  name="type"
                  margin="normal"
                  fullWidth
                  size="small"
                  onChange={handleChangee}
                  value={formValues.type}
                  required
                >
                  {typeList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="text-danger ">
                  <small>{formErrors.type}</small>
                </div>
                <div></div>
              </div>
            </div>

            <div
              className="p-2 d-flex flex-row  "
              style={{ height: "120px", marginLeft: "40px" }}
            >
              <div className="p-2 d-flex flex-column col-md-5  ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.address" />*
                </div>
                <div>
                  <TextField
                    name="adresse"
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={handleChangee}
                    value={formValues.adresse}
                    required
                  ></TextField>
                  <div className="text-danger ">
                    <small>{formErrors.adresse}</small>
                  </div>
                </div>
              </div>
              <div
                className="p-2 d-flex flex-column col-md-5  "
                style={{ width: "50px", marginLeft: "80px" }}
              >
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.governorate" />*
                </div>
                <div>
                  <TextField
                    className="textfield"
                    select
                    name="gouvernorat"
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    onChange={handleChangee}
                    value={formValues.gouvernorat}
                  >
                    {gouvernoratList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div className="text-danger ">
                    <small>{formErrors.gouvernorat}</small>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-2 d-flex flex-row  "
              style={{ height: "120px", marginLeft: "40px" }}
            >
              <div className="p-2 d-flex flex-column col-md-5  ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.mail" />*
                </div>
                <div>
                  <TextField
                    className="textfield"
                    name="email"
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    onChange={handleChangee}
                    value={formValues.email}
                  ></TextField>
                  <div className="text-danger ">
                    <small>{formErrors.email}</small>
                    <small>{formErrors.emailForme}</small>
                  </div>
                </div>
              </div>
              <div
                className="p-2 d-flex flex-column col-md-5  "
                style={{ width: "50px", marginLeft: "80px" }}
              ></div>
            </div>

            <div
              className="p-2 d-flex flex-row  "
              style={{ height: "120px", marginLeft: "40px" }}
            >
              <div className="p-2 d-flex flex-column col-md-5  ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.fax" />*
                </div>
                <div>
                  <TextField
                    className="textfield"
                    name="fax"
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    onChange={handleChangee}
                    value={formValues.fax}
                  ></TextField>
                  <div className="text-danger ">
                    <small>{formErrors.fax}</small>
                    <small>{formErrors.faxForme}</small>
                  </div>
                </div>
              </div>
              <div
                className="p-2 d-flex flex-column col-md-5 "
                style={{ marginLeft: "80px" }}
              >
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="gestion.agence.tel" />*
                </div>
                <div>
                  <TextField
                    className="textfield"
                    name="numeroTel"
                    margin="normal"
                    fullWidth
                    required
                    onChange={handleChangee}
                    value={formValues.numeroTel}
                    size="small"
                  ></TextField>
                  <div className="text-danger ">
                    <small>{formErrors.numeroTel}</small>
                    <small>{formErrors.numeroTelForme}</small>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-2 d-flex flex-row justify-content-center "
              style={{
                height: "70px",
              }}
            >
              <div className="p-2">
                {show && (
                  <Alert
                    style={{
                      maxHeight: "70px",
                    }}
                    id="alert"
                    severity={success}
                  >
                    {alert}
                  </Alert>
                )}
              </div>
            </div>
            <div className="p-2 d-flex flex-row justify-content-center">
              <div className="p-2">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    borderRadius: "80px",
                    marginRight: "80px",
                    fontSize: "18px",
                    fontFamily: " sans-serif",
                    textTransform: "none",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  onClick={handleCancel}
                >
                  <IntlMessages id="cancel" />
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
                  onClick={handleSubmit}
                >
                  <IntlMessages id="confirm" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
