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
import { addUser, editUser } from "../../../../../store/actions/User";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { connect } from "react-redux";
import { Formik, useFormik, Form } from "formik";
import { validationSchema } from "../../../../../constants/validationSchemaUser";
import {
  countryList,
  roleList,
} from "../../../../../../src/constants/variables and listes";
import { getRoleId } from "../../../../../constants/validationFunctions";

function AddUser(props) {
  let dispatch = useDispatch(props);
  const Input = styled("input")({
    display: "none",
  });
  const { agences } = props;
  const agenceListName = agences.filter(({ name }) => name != null);
  const [papier, setPapier] = useState("");
  const [photo, setPhoto] = useState("");
  var initialValues;
  

 
  if (props.isOpen === true) {
    initialValues = {
      firstName: props.data.firstName,
      lastName: props.data.lastName,
      gender: props.data.gender,
      dateBirth: props.data.dateBirth,
      country: props.data.country,
      roleId: props.data.roleId,
      identifier: props.data.identifier,
      agenceId: props.data.agenceId,
      email: props.data.email,
      address: props.data.address,
      telephoneNumber: props.data.telephoneNumber,
      postalCode: props.data.postalCode,
      cin: props.data.cin,
    };
 
  } else {
    initialValues = {
      firstName: "",
      lastName: "",
      gender: "",
      dateBirth: "",
      country: "",
      roleId: "",
      identifier: "",
      agenceId: "",
      email: "",
      address: "",
      telephoneNumber: "",
      postalCode: "",
      cin: "",
    };
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setPhoto(URL.createObjectURL(file).slice(5));
    }
  };
  const onPapierChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setPapier(URL.createObjectURL(file).slice(5));
    }
  };
  const reinitialiser = () => {
    props.openUser();
  };

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    if (props.isOpen === true) {
      dispatch(
        editUser({
          ...values,
          attachment: papier,
          photo: photo,
          id:props.data.id
        })
      );
    } else {
      dispatch(
        addUser({
          ...values,
          attachment: papier,
          photo: photo,
        })
      );
    }
    props.openUser();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Modal isOpen={props.openUser}>
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
                  onClick={props.openUser}
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
                          marginLeft: "40px",
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
                  />
                  {formik.touched.dateBirth && formik.errors.dateBirth ? (
                    <div className="error" style={{ color: "red" }}>
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
                    <div className="error" style={{ color: "red" }}>
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
                    <div className="error" style={{ color: "red" }}>
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
                    <div className="error" style={{ color: "red" }}>
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
                      <div className="error" style={{ color: "red" }}>
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
                    {formik.touched.postalCode && formik.errors.postalCode ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.postalCode}</small>
                      </div>
                    ) : null}
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
                      onClick={() => {}}
                    >
                      <PhotoCamera style={{ color: orange[500] }} />
                      <div
                        style={{
                          fontSize: "18px",
                          marginRight: "5%",
                          color: "orange",
                        }}
                      >
                        <IntlMessages id="add.picture" />
                      </div>
                    </IconButton>
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
                    name="roleId"
                    select
                    margin="normal"
                    fullWidth
                    size="small"
                    required
                    {...formik.getFieldProps("roleId")}
                  >
                    {roleList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.roleId && formik.errors.roleId ? (
                    <div className="error" style={{ color: "red" }}>
                      <small>{formik.errors.roleId}</small>
                    </div>
                  ) : null}
                </div>
                <div className="p-2 d-flex flex-column flex-wrap col-md-4 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="user.identifiant" />*
                  </div>
                  <div>
                    <TextField
                      name="identifier"
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      required
                      {...formik.getFieldProps("identifier")}
                    ></TextField>
                    {formik.touched.identifier && formik.errors.identifier ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.identifier}</small>
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
                    name="agenceId"
                    select
                    margin="normal"
                    fullWidth
                    size="small"
                    {...formik.getFieldProps("agenceId")}
                  >
                    {agenceListName.map((option) => (
                      <MenuItem key={option.name} value={option.id}>
                        {option.name}
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

              <div className="p-2 d-flex flex-row  flex-wrap justify-content-center mt-4 ">
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
  const { agences } = Agence;
  return {
    agences,
  };
};
export default connect(mapStateToProps, {})(AddUser);
