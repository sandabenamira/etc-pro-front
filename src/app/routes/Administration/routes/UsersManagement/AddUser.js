import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
//import { orange } from "@material-ui/core/colors";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { addUser } from "../../../../../store/actions/User";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Alert from "@material-ui/lab/Alert";
import {
  isEmail,
  isPhonenumber,
  isNotEmpty,
} from "../../../../../constants/validationFunctions";

export default function AddUser(props) {
  let dispatch = useDispatch(props);

  const [papier, setPapier] = useState("");
  const [photos, setPhotos] = useState([]);
  const [URLphoto, setURLPhoto] = useState([]);

  const initialValues = {
    nom: "",
    prenom: "",
    genre: "",
    date_naissance: "",
    pays: "",
    role: "",
    identifiant: "",
    agency: "",
    email: "",
    adresse_postale: "",
  };
  const paysList = [
    {
      value: "France",
      label: "France",
    },
    {
      value: "Tunisie",
      label: "Tunisie",
    },
    {
      value: "Canada",
      label: "Canada",
    },
  ];
  const roleList = [
    {
      value: "admine",
      label: "admine",
    },
    {
      value: "RH",
      label: "RH",
    },
    {
      value: "Employé",
      label: "Employé",
    },
  ];
  const agencyList = [
    {
      value: "BIAT Sousse",
      label: "BIAT Sousse",
    },
    {
      value: "BIAT Sfax",
      label: "BIAT Sfax",
    },
    {
      value: "BIAT Mounastir",
      label: "BIAT Mounastir",
    },
  ];

  useEffect(() => {
    if (photos.length < 1) return;
    const newImageURLs = [];
    photos.forEach((photo) => newImageURLs.push(URL.createObjectURL(photo)));
    setURLPhoto(newImageURLs);
  }, [photos]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhotos([...event.target.files]);
    }
  };

  const onPapierChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setPapier(URL.createObjectURL(file));
    }
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChangee = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
      photos: URLphoto[0],
    });
    console.log(formValues);
  };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  });
  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.nom = "champ requis ! ";
    }

    if (!values.prenom) {
      errors.prenom = "champ requis ! ";
    }
    if (!values.genre) {
      errors.genre = "champ requis ! ";
    }
    if (!values.pays) {
      errors.pays = "champ requis ! ";
    }

    if (!values.adresse_postale) {
      errors.adresse_postale = "champ requis ! ";
    }
    if (!values.role) {
      errors.role = "champ requis ! ";
    }
    if (!values.agency) {
      errors.agency = "champ requis ! ";
    }
    if (!values.identifiant) {
      errors.identifiant = "champ requis ! ";
    }
    if (!values.email) {
      errors.email = "champ requis ! ";
    }
    if (!papier) {
      errors.papier = "champ requis ! ";
    }
    if (!isEmail(formValues.email)) {
      errors.emailForme = "forme email requis ! ";
    }

    if (!values.tel) {
      errors.tel = "champ requis ! ";
    }

    if (!values.cin) {
      errors.cin = "champ requis ! ";
    }
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (setIsSubmit(true));
    {
      let finalData = {
        nom: formValues.nom,
        prenom: formValues.prenom,
        genre: formValues.genre,
        dateNaissance: new Date(formValues.date_naissance),
        pays: formValues.pays,
        codePostal: parseInt(formValues.code_postale),
        adressePostale: formValues.adresse_postale,
        photo: URLphoto[0],
        role: formValues.role,
        identifiant: formValues.identifiant,
        agency: formValues.agency,
        email: formValues.email,
        //   "password": "string",
        pieceJointe: papier,
        createdIn: new Date(),
        modifiedIn: new Date(),
        numeroTelephone: formValues.tel,
        cin: formValues.cin,
        archive: false,
      };
      dispatch(addUser(finalData));
    }
  };
  const reinitialiser = () => {
    props.openaddUser();
  };
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("error");
  const [view, setView] = useState(false);
  // const alertt = () => {
  //   console.log("heyyy");

  //   setSuccess("success");
  //   console.log("heyyy2");

  //   // document.getElementById("alert").style.display = "block";
  //   setView(true);
  //   console.log("heyyy3");

  //   setAlert("champ");
  //   console.log("heyyy4");
  // };
  const Input = styled("input")({
    display: "none",
  });

  return (
    <Modal isOpen={props.openaddUser}>
      <ModalBody>
        <form className="row" autoComplete="off" onSubmit={handleSubmit}>
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
              style={{ color: "#4C25B7", fontSize: "25px" }}
            >
              <IntlMessages id="add.user" />
            </div>

            <br />
            <br />

            <div
              className="p-2 d-flex  flex-wrap flex-row  "
              style={{ height: "120px" }}
            >
              <div className="p-2 d-flex flex-column  col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.name" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    name="nom"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={handleChangee}
                    value={formValues.nom}
                    required
                  ></TextField>

                  <div className="text-danger ">
                    <small>{formErrors.nom}</small>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap   col-md-4  ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.last.name" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    name="prenom"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={handleChangee}
                    value={formValues.prenom}
                  ></TextField>
                  <div className="text-danger ">
                    <small> {formErrors.prenom}</small>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap   col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.genre" />{" "}
                </div>
                <div className="">
                  <RadioGroup
                    className=" d-flex flex-row"
                    value={formValues.gender}
                    onChange={handleChangee}
                    name="gender"
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
                      style={
                        {
                          //   marginLeft:"2%"
                        }
                      }
                      control={<Radio color="primary" />}
                    />
                    <i
                      className="zmdi zmdi-female zmdi-hc-3x"
                      style={{ color: "orange" }}
                    ></i>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div
              className="p-2 d-flex flex-wrap flex-row "
              style={{ height: "120px" }}
            >
              <div className=" p-2 d-flex flex-column col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.birthday.date" />
                  <TextField
                    id="date"
                    type="date"
                    onChange={handleChangee}
                    value={formValues.date_naissance}
                    name="date_naissance"
                    fullWidth
                    style={{}}
                  />
                </div>
              </div>
              <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="country.user" />
                </div>
                <TextField
                  id="outlined-select-currency"
                  select
                  value={formValues.pays}
                  onChange={handleChangee}
                  name="pays"
                >
                  {paysList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="text-danger ">
                  <small> {formErrors.pays}</small>
                </div>
              </div>
              <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                {/* <div style={{ fontSize: "18px" }}>Email </div> */}
              </div>
            </div>
            <div
              className="p-2 d-flex flex-wrap flex-row "
              style={{ height: "120px" }}
            >
              <div className=" p-2 d-flex flex-column col-md-4 ">
                <div style={{ fontSize: "18px" }}>Email </div>
                <TextField
                  className="textfield"
                  fullWidth
                  size="small"
                  onChange={handleChangee}
                  value={formValues.email}
                  name="email"
                  required
                  style={{
                    marginTop: "1.3%",
                  }}
                ></TextField>

                <div className="text-danger ">
                  <small>{formErrors.email} </small>{" "}
                  <small>{formErrors.emailForme}</small>
                </div>
              </div>
              <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>N° tel </div>
                <TextField
                  onChange={handleChangee}
                  value={formValues.tel}
                  name="tel"
                  fullWidth
                  style={{}}
                />
                <div className="text-danger ">
                  <small>{formErrors.tel} </small>
                </div>
              </div>
              <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>CIN </div>
                <div>
                  <TextField
                    className="textfield"
                    fullWidth
                    size="small"
                    onChange={handleChangee}
                    value={formValues.cin}
                    name="cin"
                    required
                    style={{
                      marginTop: "1.3%",
                    }}
                  ></TextField>
                  <div className="text-danger ">
                    <small>
                      {formErrors.cin} {formErrors.cin}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-2 d-flex flex-wrap flex-row "
              style={{ height: "120px" }}
            >
              <div className="p-2 d-flex flex-column col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.address.postal" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    name="adresse_postale"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={handleChangee}
                    value={formValues.adresse_postale}
                    required
                  ></TextField>
                  <div className="text-danger ">
                    <small> {formErrors.adresse_postale}</small>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="zip.code.user" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={handleChangee}
                    value={formValues.code_postale}
                    name="code_postale"
                    required
                  ></TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                <label
                  htmlFor="icon-button-file"
                  style={{
                    marginLeft: "9%",
                  }}
                >
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
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    style={{
                      color: "#696969",
                    }}
                    // onClick={onImageUpload}
                  >
                    <PhotoCamera />
                    <div style={{ fontSize: "18px", marginRight: "5%" }}>
                      <IntlMessages id="add.picture" />
                    </div>
                  </IconButton>
                </label>

                {/* <Button
                  style={{
                    fontSize: "18px",
                    marginBottom: "10%",
                    color: "orange",
                  }}
                  onChange={onImageChange}
                  startIcon={
                    <AddCircleOutlineOutlinedIcon
                      style={{ marginTop: "17%", color: orange[500] }}
                    />
                  }
                >
                </Button> */}
                {/* <input type="file" name="myImage" onChange={onImageChange} /> */}
              </div>
            </div>
            <div
              className="p-2 d-flex flex-wrap flex-row "
              style={{ height: "120px" }}
            >
              <div className="p-2 d-flex flex-column col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.role" />
                </div>

                <TextField
                  className="textfield"
                  select
                  margin="normal"
                  fullWidth
                  size="small"
                  onChange={handleChangee}
                  value={formValues.role}
                  name="role"
                >
                  {roleList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="text-danger ">
                  <small> {formErrors.role}</small>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.identifiant" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={handleChangee}
                    value={formValues.identifiant}
                    name="identifiant"
                  ></TextField>
                  <div className="text-danger ">
                    <small> {formErrors.identifiant}</small>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="agency" />
                </div>
                <TextField
                  className="textfield"
                  name="agency"
                  select
                  margin="normal"
                  fullWidth
                  size="small"
                  onChange={handleChangee}
                  value={formValues.agency}
                >
                  {agencyList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="text-danger ">
                  <small> {formErrors.agency}</small>
                </div>
              </div>
            </div>
            <div
              className="p-2 d-flex flex-wrap flex-row"
              style={{ height: "90px" }}
            >
              <div className="p-2" style={{ fontSize: "18px" }}>
                <IntlMessages id="user.join.papiers" />
              </div>
              <div className="ml-5">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onPapierChange}
                  />

                  <Button
                    color="default"
                    style={{ borderRadius: "80px", fontWeight: "bold" }}
                    startIcon={<AttachmentIcon />}
                    variant="contained"
                    component="span"
                  >
                    <IntlMessages id="message.attach.file" />
                  </Button>
                  <div className="text-danger ">
                    <small> {formErrors.papier}</small>
                  </div>
                </label>
              </div>
              <div
                className="p-2 d-flex flex-column flex-wrap col-md-4 ml-3"
                //alerte
              >
                {view && (
                  <Alert
                    style={{
                      display: "none",
                      maxHeight: "70px",
                      // maxWidth: "100%",
                    }}
                    // id="alert"
                    severity={success}
                  >
                    hello
                    {alert}
                  </Alert>
                )}
              </div>
            </div>

            <div className="p-2 d-flex flex-row  flex-wrap justify-content-center mt-3">
              <div className="p-2">
                <Button
                  type="reset"
                  variant="outlined"
                  color="primary"
                  style={{ borderRadius: "80px" }}
                  onClick={reinitialiser}
                >
                  <IntlMessages id="cancel" />
                </Button>
              </div>
              <div className="p-2 ml-3">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "80px" }}
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
