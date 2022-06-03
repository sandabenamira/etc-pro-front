import { useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import { addAgence } from "../../../../../store/actions/Agence";
import MenuItem from "@mui/material/MenuItem";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";

function AddAgence(props) {
  let dispatch = useDispatch();
  const { showMessage, success, alertMessage } = props;
  const initialValues = {
    name: "",
    type: "",
    governorate: "",
    fax: "",
    telephoneNumber: "",
    address: "",
    email: "",
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

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Veuillez entrer un name valide")
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    type: Yup.string()
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Veuillez entrer un type valide")
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    governorate: Yup.string()
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Veuillez entrer un governorate valide"
      )
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    fax: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Veuillez entrer un fax valide")
      .max(40, "Trop long ! maximum 40 chiffres ")
      .min(6, "Trop court ! minimum 6 chiffres"),
    telephoneNumber: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Veuillez entrer un numéro du tel valide")
      .max(40, "Trop long ! maximum 40 chiffres ")
      .min(6, "Trop court ! minimum 6 chiffres"),
    address: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Veuillez entrer un adresse valide"
      )
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    email: Yup.string()
      .trim("Champ obligatoire !")
      .email("Veuillez entrer une adresse e-mail valide  ")
      .required("Champ obligatoire !")
      .max(40, "Trop long ! maximum 40 caractères")
      .min(3, "Trop court! minimum 3 caractères"),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    dispatch(addAgence({ ...values }));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Modal isOpen={props.openaddAgence}>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form
            className="row "
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            noValidate
          >
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
              <div className="p-2 d-flex flex-row  ">
                <div
                  className="p-2 d-flex flex-column col-md-6 form-group   "
                  style={{ height: "80px" }}
                >
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="gestion.agence.agency" />*
                  </div>
                  <div>
                    <TextField
                      name="name"
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("name")}
                      required
                    ></TextField>
                    {formik.touched.name && formik.errors.name ? ( //si visit and message existe show the msg
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.name}</small>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="p-2 d-flex flex-column col-md-6  ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="gestion.agence.agency.type" />*
                  </div>
                  <TextField
                    className="textfield"
                    select
                    name="type"
                    margin="normal"
                    fullWidth
                    size="small"
                    {...formik.getFieldProps("type")}
                    required
                  >
                    {typeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.type && formik.errors.type ? (
                    <div className="error" style={{ color: "red" }}>
                      <small>{formik.errors.type}</small>
                    </div>
                  ) : null}

                  <div></div>
                </div>
              </div>

              <div className="p-2 d-flex flex-row  ">
                <div className="p-2 d-flex flex-column col-md-6  ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="gestion.agence.address" />*
                  </div>
                  <div>
                    <TextField
                      name="address"
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("address")}
                      required
                    ></TextField>
                    {formik.touched.address && formik.errors.address ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.address}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column col-md-6  ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="gestion.agence.governorate" />*
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      select
                      name="governorate"
                      margin="normal"
                      fullWidth
                      size="small"
                      required
                      {...formik.getFieldProps("governorate")}
                    >
                      {gouvernoratList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {formik.touched.governorate && formik.errors.governorate ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.governorate}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="p-2 d-flex flex-row  ">
                <div className="p-2 d-flex flex-column col-md-6  ">
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
                      {...formik.getFieldProps("email")}
                    ></TextField>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.email}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column col-md-6  "></div>
              </div>

              <div className="p-2 d-flex flex-row  ">
                <div className="p-2 d-flex flex-column col-md-6  ">
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
                      {...formik.getFieldProps("fax")}
                    ></TextField>
                    {formik.touched.fax && formik.errors.fax ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.fax}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column col-md-6 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="gestion.agence.tel" />*
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      name="telephoneNumber"
                      margin="normal"
                      fullWidth
                      required
                      {...formik.getFieldProps("telephoneNumber")}
                      size="small"
                    ></TextField>
                    {formik.touched.telephoneNumber &&
                    formik.errors.telephoneNumber ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.telephoneNumber}</small>
                      </div>
                    ) : null}
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
                  {showMessage && (
                    <Alert
                      style={{
                        maxHeight: "70px",
                      }}
                      id="alert"
                      severity={success}
                    >
                      {alertMessage}
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
                      fontSize: "18px",
                      fontFamily: " sans-serif",
                      textTransform: "none",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    onClick={props.openaddAgence}
                  >
                    <IntlMessages id="cancel" />
                  </Button>
                </div>
                <div className="p-2 ">
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
                    disabled={!(formik.isValid || formik.isSubmitting)}
                  >
                    <IntlMessages id="confirm" />
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </ModalBody>
    </Modal>
  );
}

const mapStateToProps = ({ Agence }) => {
  const { showMessage, alertMessage, success } = Agence;
  return {
    showMessage,
    alertMessage,
    success,
  };
};
export default connect(mapStateToProps, {})(AddAgence);
