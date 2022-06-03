import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { orange } from "@material-ui/core/colors";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { addUser } from "../../../../../store/actions/User";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
import {
  countryList,
  roleList,
  agencyList,
} from "../../../../../../src/constants/variables and listes";
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

function AddUser(props) {
  let dispatch = useDispatch(props);
  const Input = styled("input")({
    display: "none",
  });
  const {
    showMessage,
    success,

    alertMessage,
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    dateBirth: "",
    country: "",
    role: "",
    identifiant: "",
    agency: "",
    email: "",
    address: "",
    telephoneNumber: "",
    postalCode: "",
    cin: "",
  };

  const [verif, setVerif] = useState(false);
  const [papier, setPapier] = useState("");
  const [photo, setPhoto] = useState("");

  const onImageChange = (event) => {
    setVerif(true);
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setPhoto(URL.createObjectURL(file));
      setVerif(false);
    }
  };
  const onPapierChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setPapier(URL.createObjectURL(file));
    }
  };

  const reinitialiser = () => {
    props.openaddUser();
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Veuillez entrer un nom valide")
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    lastName: Yup.string()
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Veuillez entrer un prénom valide"
      )
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    gender: Yup.string().required("Champ obligatoire !"),

    dateBirth: Yup.date()
      .required("Champ obligatoire !")
      .max(new Date(), "Entrer une date valide"),

    email: Yup.string()
      .trim("Champ obligatoire !")
      .email("Veuillez entrer une adresse e-mail valide  ")
      .required("Champ obligatoire !")
      .max(40, "Trop long ! maximum 40 caractères")
      .min(3, "Trop court! minimum 3 caractères"),

    telephoneNumber: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Veuillez entrer un numéro téléphone valide")
      .max(40, "Trop long ! maximum 40 chiffres ")
      .min(6, "Trop court ! minimum 6 chiffres"),

    cin: Yup.string()
      .trim("Champ obligatoire !")
      .required("Champ obligatoire !")
      .matches(phoneRegExp, "Veuillez entrer un numéro cin valide")
      .max(8, "indiquer 8 chiffres ")
      .min(8, "ndiquer 8 chiffres"),
    country: Yup.string()
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une pays valide"),

    address: Yup.string()
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une adresse valide")
      .max(40, "Trop long ! maximum 40")
      .min(2, "Trop court! minimum 2"),
    postalCode: Yup.string()
      .trim("Champ obligatoire !")

      .matches(phoneRegExp, "Entrer un code valide")
      .max(20, "Trop long ! maximum 20 chiffres ")
      .min(4, "Trop court ! minimum 4 chiffres"),

    role: Yup.string().required("Champ obligatoire !"),
    identifiant: Yup.string()
      .required("Champ obligatoire !")
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, "Entrer une identifiant valide"),
    photo: Yup.string().matches(
      /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
      "Entrer une photo valide"
    ),
  });

  //       attachment: papier,
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    dispatch(
      addUser({
        ...values,
        attachment: papier.slice(5),
        photo: photo.slice(5),
        roleId: parseInt(values.role),
      })
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <Modal isOpen={props.openaddUser}>
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
            <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-12 col-sm-12">
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
                  onClick={props.openaddUser}
                  style={{
                    marginTop: "-2%",
                    marginLeft: "88%",
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div
                className="d-flex align-item-center justify-content-center "
                style={{ color: "#3f51b5", fontSize: "25px" }}
              >
                <IntlMessages id="add.user" />
              </div>

              <br />
              <br />

              <div className="p-2 d-flex  flex-wrap flex-row  ">
                <div className="p-2 d-flex flex-column  col-md-4   col-sm-12">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.name" />*
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      name="firstName"
                      margin="normal"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("firstName")}
                      required
                    ></TextField>

                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.firstName}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap   col-md-4 col-sm-12 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.last.name" />*
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      name="lastName"
                      margin="normal"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("lastName")}
                    ></TextField>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.lastName}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap   col-md-4 col-sm-12">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.genre" />*
                  </div>
                  <div className="">
                    <RadioGroup
                      className=" d-flex flex-row"
                      {...formik.getFieldProps("gender")}
                      name="gender"
                    >
                      <FormControlLabel
                        value="masculin"
                        control={<Radio color="primary" size="small" />}
                      />

                      <i
                        className="zmdi zmdi-male-alt zmdi-hc-3x"
                        style={{ color: "blue", marginLeft: "-25px" }}
                      ></i>
                      <FormControlLabel
                        value="féminin"
                        control={<Radio color="primary" size="small" />}
                        style={{
                          marginLeft: "10px",
                        }}
                      />
                      <i
                        className="zmdi zmdi-female zmdi-hc-3x"
                        style={{ color: "orange", marginLeft: "-25px" }}
                      ></i>
                    </RadioGroup>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.gender}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="p-2 d-flex flex-wrap flex-row ">
                <div className=" p-2 d-flex flex-column col-md-4 col-sm-12 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.birthday.date" />* 
                  </div>
                  <TextField
                    id="date"
                    type="date"
                    {...formik.getFieldProps("dateBirth")}
                    name="dateBirth"
                    fullWidth
                    required
                    InputProps={{
                      max: "2020-04-01",
                    }}
                  />
                  {formik.touched.dateBirth && formik.errors.dateBirth ? (
                    <div
                      className="error"
                      style={{ color: "red" }}
                    >
                      <small>{formik.errors.dateBirth}</small>
                    </div>
                  ) : null}
                </div>
                <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="country.user" />*
                  </div>
                  <TextField
                    id="outlined-select-currency"
                    select
                    {...formik.getFieldProps("country")}
                    name="country"
                  >
                    {countryList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.country && formik.errors.country ? (
                    <div
                      className="error"
                      style={{ color: "red" }}
                    >
                      <small>{formik.errors.country}</small>
                    </div>
                  ) : null}
                </div>
                <div className=" p-2 d-flex flex-column flex-wrap col-md-4 "></div>
              </div>
              <div className="p-2 d-flex flex-wrap flex-row ">
                <div className=" p-2 d-flex flex-column col-md-4 ">
                  <div style={{ fontSize: "18px" }}>Email* </div>
                  <TextField
                    className="textfield"
                    fullWidth
                    size="small"
                    {...formik.getFieldProps("email")}
                    name="email"
                    required
                   
                  ></TextField>

                  {formik.touched.email && formik.errors.email ? (
                    <div
                      className="error"
                      style={{ color: "red" }}
                    >
                      <small>{formik.errors.email}</small>
                    </div>
                  ) : null}
                </div>
                <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>N° téléphone* </div>
                  <TextField
                    {...formik.getFieldProps("telephoneNumber")}
                    name="telephoneNumber"
                    fullWidth
                  />
                  {formik.touched.telephoneNumber &&
                  formik.errors.telephoneNumber ? (
                    <div
                      className="error"
                      style={{ color: "red" }}
                    >
                      <small>{formik.errors.telephoneNumber}</small>
                    </div>
                  ) : null}
                </div>
                <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>CIN* </div>
                  <div>
                    <TextField
                      className="textfield"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("cin")}
                      name="cin"
                      required
                    
                    ></TextField>
                    {formik.touched.cin && formik.errors.cin ? (
                      <div
                        className="error"
                        style={{ color: "red" }}
                      >
                        <small>{formik.errors.cin}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="p-2 d-flex flex-wrap flex-row ">
                <div className="p-2 d-flex flex-column col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.address.postal" />*
                  </div>

                  <TextField
                    className="textfield"
                    name="address"
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
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="zip.code.user" />
                  </div>
                  <div>
                    <TextField
                      name="postalCode"
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("postalCode")}
                    
                    ></TextField>
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 col-md-4 mt-2 ">
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={onImageChange}
                      style={{
                        marginLeft: "5%",
                        color: "#4C25B7",
                        fontSize: "25px",
                      }}
                      name="photo"
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      style={{
                        color: "#696969",
                      }}
                      onClick={() => {
                        if (photo === "") {
                          setVerif(true);
                        }
                      }}
                    >
                      <PhotoCamera style={{ color: orange[500] }} />
                      <div
                        style={{
                          fontSize: "18px",
                          marginRight: "5%",
                          color: "orange",
                        }}
                      >
                        <IntlMessages id="add.picture" />*
                      </div>
                    </IconButton>
                    {verif ? (
                      <div
                        className="error"
                        style={{ color: "red" }}
                      >
                        <small>{"Champ obligatoire !"}</small>
                      </div>
                    ) : null}
                  </label>
                </div>
              </div>
              <div className="p-2 d-flex flex-wrap flex-row ">
                <div className="p-2 d-flex flex-column col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.role" />*
                  </div>

                  <TextField
                    className="textfield"
                    select
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    {...formik.getFieldProps("role")}
                    name="role"
                  >
                    {roleList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.role && formik.errors.role ? (
                    <div className="error" style={{ color: "red" }}>
                      <small>{formik.errors.role}</small>
                    </div>
                  ) : null}
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.identifiant" />*
                  </div>
                  <div>
                    <TextField
                      name="identifiant"
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      required
                      {...formik.getFieldProps("identifiant")}
                    ></TextField>
                    {formik.touched.identifiant && formik.errors.identifiant ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.identifiant}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.Agency" />
                  </div>
                  <TextField
                    className="textfield"
                    name="agency"
                    select
                    margin="normal"
                    fullWidth
                    size="small"
                    {...formik.getFieldProps("agency")}
                  >
                    {agencyList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-wrap flex-row">
                <div className="p-2 mr-2">
                  <div style={{ fontSize: "18px" }}>Papier Administratif </div>
                </div>
                <div className="ml-5">
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="papier"
                      onChange={onPapierChange}
                    />

                    <Button
                      color="default"
                      style={{
                        borderRadius: "5px",
                        textTransform: "none",
                        paddingRight: "60px",
                      }}
                      startIcon={<AttachmentIcon />}
                      variant="contained"
                      component="span"
                    >
                      <IntlMessages
                        id="message.attach.file"
                        style={{ color: "default" }}
                      />
                    </Button>
                  </label>
                </div>
              </div>
              <div className="p-2 d-flex   flex-wrap justify-content-center mb-4 ">
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
              <div className="p-2 d-flex flex-row  flex-wrap justify-content-center ">
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
                    onClick={reinitialiser}
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
                    onClick={() => {
                      if (photo === "") {
                        setVerif(true);
                      }
                    }}
                    // disabled={!(formik.isValid && formik.isSubmitting && verif===true)}
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
const mapStateToProps = ({ users }) => {
  const { showMessage, alertMessage, success } = users;
  return {
    showMessage,
    alertMessage,
    success,
  };
};
export default connect(mapStateToProps, {})(AddUser);
