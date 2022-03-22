import { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { addUser } from "../../../../../store/actions/User";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function AddUser(props) {
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [genre, setGenre] = useState();
  const [date_naissance, setDate_naissance] = useState();
  const [pays, setPays] = useState();
  const [adresse_postale, setAdresse_postale] = useState();
  const [code_postale, setCode_postale] = useState();

  // const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [photos, setPhotos] = useState([]);
  const [URLphoto, setURLPhoto] = useState([]);

  const [formData, setFormData] = useState(new FormData());

  const [role, setRole] = useState();
  const [identifiant, setIdentifiant] = useState();
  const [agency, setAgency] = useState();
  const [papier, setPapier] = useState();
  const [email, setEmail] = useState();

  let dispatch = useDispatch(props);

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalData = {
      nom: nom,
      prenom: prenom,
      genre: genre,
      dateNaissance: date_naissance,
      pays: pays,
      codePostal: code_postale,
      adressePostale: adresse_postale,
      photo: URLphoto,
      role: role,
      identifiant: identifiant,
      agency: agency,
      email: email,
      //   "password": "string",
      pieceJointe: papier,

      createdIn: new Date(),
      mdifiedIn: new Date(),
      //numeroTelephone:
    };

    dispatch(addUser(finalData));
  };
  const handleCancel = (e) => {
    setNom("");
    setPrenom("");
    setGenre("");
    setDate_naissance("");
    setPays("");
    setAdresse_postale("");
    setCode_postale("");
    setCode_postale("");
    setPhotos("");
    setRole("");
    setIdentifiant("");
    setAgency("");
    setPapier("");
    setEmail("");
  };
  const choisirGenre = (e) => {
    if (e.target.value === "masculin") {
      setGenre("masculin");
    } else if (e.target.value === "féminin") {
      setGenre("féminin");
    }
  };
  const handleChangePays = (event) => {
    setPays(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangeAgency = (event) => {
    setAgency(event.target.value);
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
      label: "BIAT Sousse",
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
    console.log("this is file",event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setPapier({
        file: URL.createObjectURL(file),
      });
    }

  };
  const Input = styled("input")({
    display: "none",
  });

  return (
    <Modal isOpen={props.openaddUser}>
      <ModalBody>
        <form className="row" autoComplete="off" onSubmit={props.handleSubmit}>
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

            <div className="p-2 d-flex  flex-wrap flex-row ">
              <div className="p-2 d-flex flex-column  col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.name" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                    required
                  ></TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap   col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.last.name" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={(e) => setPrenom(e.target.value)}
                    value={prenom}
                  ></TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap   col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.genre" />{" "}
                </div>
                <div className="">
                  <RadioGroup className=" d-flex flex-row">
                    <FormControlLabel
                      value="masculin"
                      control={
                        <Radio
                          color="primary"
                          checked={genre === "masculin"}
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
                      style={
                        {
                          //   marginLeft:"2%"
                        }
                      }
                      control={
                        <Radio
                          checked={genre === "féminin"}
                          onChange={choisirGenre}
                          color="primary"
                        />
                      }
                    />
                    <i
                      className="zmdi zmdi-female zmdi-hc-3x"
                      style={{ color: "orange" }}
                    ></i>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="p-2 d-flex flex-wrap flex-row ">
              <div className=" p-2 d-flex flex-column col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.birthday.date" />
                  <TextField
                    id="date"
                    type="date"
                    onChange={(e) => setDate_naissance(e.target.value)}
                    value={date_naissance}
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
                  value={pays}
                  onChange={handleChangePays}
                >
                  {paysList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className=" p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>Email </div>
                <div>
                  <TextField
                    className="textfield"
                    fullWidth
                    size="small"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    style={{
                      marginTop: "1.3%",
                    }}
                  ></TextField>
                </div>
              </div>
            </div>

            <div className="p-2 d-flex flex-wrap flex-row ">
              <div className="p-2 d-flex flex-column col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="user.address.postal" />
                </div>
                <div>
                  <TextField
                    className="textfield"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={(e) => setAdresse_postale(e.target.value)}
                    value={adresse_postale}
                    required
                  ></TextField>
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
                    onChange={(e) => setCode_postale(e.target.value)}
                    value={code_postale}
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
            <div className="p-2 d-flex flex-wrap flex-row ">
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
                  onChange={handleChangeRole}
                  value={role}
                >
                  {roleList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                    onChange={(e) => setIdentifiant(e.target.value)}
                    value={identifiant}
                  ></TextField>
                </div>
              </div>
              <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                <div style={{ fontSize: "18px" }}>
                  <IntlMessages id="agency" />
                </div>
                <TextField
                  className="textfield"
                  select
                  margin="normal"
                  fullWidth
                  size="small"
                  onChange={handleChangeAgency}
                  value={agency}
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
                </label>
              </div>
            </div>

            <div className="p-2 d-flex flex-row  flex-wrap justify-content-center">
              <div className="p-2">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ borderRadius: "80px" }}
                  onClick={handleCancel}
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
