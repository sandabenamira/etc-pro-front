import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../util/Auxiliary";
 import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import { updateEstablishment } from "../../../../actions/establishmentAction";
import _ from "lodash";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const mode_payment = [
  {
    value: "Semestre",
    label: <IntlMessages id="mode_payment.establishment.semester" />,
  },
  {
    value: "Trimestre",
    label: <IntlMessages id="mode_payment.establishment.trimester" />,
  },
  {
    value: "Mensuel",
    label: <IntlMessages id="mode_payment.establishment.monthly" />,
  },
  {
    value: "Annuel",
    label: <IntlMessages id="mode_payment.establishment.annual" />,
  },
];

class EditEstablishment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: this.props.modal,
      name: "",
      ar_disabled: true,
      address: "",
      code: "",
      city: "",
      countries_id: null,
      phone: "",
      email_establishment: "",
      website: "",
      surname_director: "",
      name_director: "",
      email_director: "",
      phone_director: "",
      estab_type_id: null,
      status: "",
      id: "",
      modules: [],
      photo: "",
      inputText: "",
      logo: "",
      establishmentlogo: null,
      establishmentPhotos: null,
      matricule: "",
      tva: 0,
      capital: 0,
      siren: 0,
      siret: 0,
      currentYearId: null,
      rib:"",
      iban:""
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeModule = this.handleChangeModule.bind(this);
    this.getBase64 = this.getBase64.bind(this);
  }
  isemail(value) {
    if (value.length > 0)
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    else return true;
  }
  isPhonenumber(str) {
    if (str.length > 1) return /^[2-9]\d{7}$/.test(str);
    else return true;
  }
  isZipCode(zipCode) {
    if (zipCode.length > 1) return /^[1-9]\d{3}$/.test(zipCode);
    else return true;
  }
  componentDidMount() {
    if (this.props.establishment.countries_id === 1) {
      this.setState({
        ar_disabled: false,
      });
    }
    this.setState({
      name: this.props.establishment.name,
      address: this.props.establishment.address,
      code: this.props.establishment.code,
      city: this.props.establishment.city,
      countries_id: this.props.establishment.countries_id,
      phone: this.props.establishment.phone,
      email_establishment: this.props.establishment.email_establishment,
      website: this.props.establishment.website,
      surname_director: this.props.establishment.surname_director,
      name_director: this.props.establishment.name_director,
      email_director: this.props.establishment.email_director,
      phone_director: this.props.establishment.phone_director,
      estab_type_id: this.props.establishment.estab_type_id,
      status: this.props.establishment.status,
      id: this.props.establishment.id,
      logo: this.props.establishment.logo,
      modules: Array.from(this.props.establishment.module_id),
      matricule: this.props.establishment.matricule,
      tva: this.props.establishment.tva,
      capital: this.props.establishment.capital,
      siren: this.props.establishment.siren,
      siret: this.props.establishment.siret,
      currentYearId: this.props.establishment.fk_id_school_year_current,
      rib:this.props.establishment.rib,
      iban:this.props.establishment.iban

    });
  }

  onDrop = (e) => {
    let file = e.target.files[0];
    this.setState({
      establishmentPhotos: file,
      inputText: file.name,
    });
  };
  handleDelete() {
    this.props.RequestDeleteEstablishment(this.props.establishment.id);
    this.props.cancelModal();
  }

  handleCancel() {
    this.props.cancelModal();
  }

  handleChangeModule = (event) => {
    this.setState({ modules: event.target.value });
  };

  handleChange = (name) => (event) => {
    if (name === "countries_id") {
      if (event.target.value === 1) {
        this.setState({
          [name]: event.target.value,
          ar_disabled: false,
        });
      } else {
        this.setState({
          [name]: event.target.value,
          ar_disabled: true,
        });
      }
    } else {
      this.setState({
        [name]: event.target.value,
      });
    }
  };

  handleToggle() {
    this.props.cancelModal();
  }
  getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      address: this.state.address,
      code: this.state.code,
      city: this.state.city,
      countries_id: this.state.countries_id,
      phone: this.state.phone,
      email_establishment: this.state.email_establishment,
      website: this.state.website,
      surname_director: this.state.surname_director,
      name_director: this.state.name_director,
      email_director: this.state.email_director,
      phone_director: this.state.phone_director,
      estab_type_id: this.state.estab_type_id,
      status: this.state.status,
      module_id: this.state.modules,
      id: this.state.id,
      logo: this.state.logo,
      matricule: this.state.matricule,
      tva: parseInt(this.state.tva, 10),
      capital: parseInt(this.state.capital, 10),
      siren: parseInt(this.state.siren, 10),
      siret: parseInt(this.state.siret, 10),
      currentYearId: this.state.currentYearId,
      iban:this.state.iban,
      rib:this.state.rib
    };
    this.props.dispatch(
      updateEstablishment(data, this.state.establishmentPhotos)
    );
    this.props.cancelModal();
  };

  isSIREN(cin) {
    if (!_.isEmpty(cin)) return /^[0-9]\d{8}$/.test(cin);
    else return true;
  }
  isSIRET(cin) {
    if (!_.isEmpty(cin)) return /^[0-9]\d{13}$/.test(cin);
    else return true;
  }

  render() {
    return (
      <Auxiliary>
        <Modal isOpen={this.props.modal}>
          <ModalHeader
            toggle={this.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="pages.establishementPage" />}
          </ModalHeader>
          <ModalBody>
            <form
              className="row"
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <div className="col-sm-12">
                <h1>
                  {<IntlMessages id="component.etablishments.info.general" />}
                </h1>
              </div>
              <div className="col-sm-2">
                <TextField
                  required
                  id="countries_id"
                  name="countries_id"
                  onChange={this.handleChange("countries_id")}
                  select
                  label={
                    <IntlMessages id="components.establishments.formadd.country" />
                  }
                  value={this.state.countries_id || ""}
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                >
                  {this.props.countries.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-5">
                <TextField
                  required
                  id="name"
                  name="name"
                  label={
                    <IntlMessages id="components.establishments.formadd.name" />
                  }
                  onChange={this.handleChange("name")}
                  value={this.state.name || ""}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-5">
                <TextField
                  required
                  id="address"
                  name="address"
                  label={
                    <IntlMessages id="components.establishments.formadd.adress" />
                  }
                  onChange={this.handleChange("address")}
                  value={this.state.address || ""}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-4">
                <TextField
                  required
                  id="code"
                  name="code"
                  type="number"
                  label={
                    <IntlMessages id="components.establishments.formadd.codezip" />
                  }
                  onChange={this.handleChange("code")}
                  error={
                    this.isZipCode(this.state.code) === false ? true : false
                  }
                  value={this.state.code || ""}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-sm-4">
                <TextField
                  required
                  id="city"
                  name="city"
                  label={
                    <IntlMessages id="components.establishments.formadd.city" />
                  }
                  onChange={this.handleChange("city")}
                  value={this.state.city || ""}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-sm-4">
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label={
                    <IntlMessages id="components.establishments.formadd.phone" />
                  }
                  onChange={this.handleChange("phone")}
                  value={this.state.phone || ""}
                  placeholder="(+XXX) XXX XXX XXX"
                  error={
                    this.isPhonenumber(this.state.phone) === true ||
                    this.state.phone.length === 0
                      ? false
                      : true
                  }
                  type="number"
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  id="email_establishment"
                  name="email_establishment"
                  type="email"
                  label={
                    <IntlMessages id="components.establishments.formadd.email_establishment" />
                  }
                  onChange={this.handleChange("email")}
                  value={this.state.email_establishment || ""}
                  error={
                    this.isemail(this.state.email_establishment) === false
                      ? true
                      : false
                  }
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  id="website"
                  name="website"
                  label={
                    <IntlMessages id="components.establishments.formadd.website" />
                  }
                  onChange={this.handleChange("website")}
                  value={this.state.website || ""}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-12">
                <br />
                <br />
                <h1>{<IntlMessages id="etablishments.info.juri" />}</h1>
              </div>

              {this.state.countries_id === 1 ? (
                <div className="row col-sm-12">
                  <div className="col-sm-4">
                    <TextField
                      required
                      id="matricule"
                      onChange={this.handleChange("matricule")}
                      value={this.state.matricule}
                      label={<IntlMessages id="etablishments.info.matricule" />}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <TextField
                      required
                      id="tva"
                      onChange={this.handleChange("tva")}
                      value={this.state.tva}
                      label={<IntlMessages id="etablishments.info.tva" />}
                      margin="normal"
                      fullWidth
                      error={
                        parseInt(this.state.tva, 10) < 0 ||
                        parseInt(this.state.tva, 10) > 100
                      }
                    />
                  </div>
                  <div className="col-sm-4">
                    <TextField
                      required
                      id="capital"
                      onChange={this.handleChange("capital")}
                      value={this.state.capital}
                      label={<IntlMessages id="etablishments.info.Capital" />}
                      margin="normal"
                      fullWidth
                      error={parseInt(this.state.capital, 10) < 0}
                    />
                  </div>
                  <div className="col-sm-6">
                      <TextField
                         id="rib"
                        onChange={this.handleChange("rib")}
                        value={this.state.rib}
                        label={<IntlMessages id="etablishments.info.rib" />}
                        margin="normal"
                        fullWidth
                        // error={
                        //   parseInt(this.state.tva, 10) < 0 ||
                        //   parseInt(this.state.tva, 10) > 100
                        // }
                      />
                    </div>
                    <div className="col-sm-6">
                      <TextField
                         id="iban"
                        onChange={this.handleChange("iban")}
                        value={this.state.iban}
                        label={<IntlMessages id="etablishments.info.iban" />}
                        margin="normal"
                        fullWidth
                        // error={
                        //   parseInt(this.state.tva, 10) < 0 ||
                        //   parseInt(this.state.tva, 10) > 100
                        // }
                      />
                    </div>
                </div>
              ) : (
                <div className="row col-sm-12">
                  <div className="col-sm-3">
                    <TextField
                      required
                      id="siren"
                      onChange={this.handleChange("siren")}
                      value={this.state.siren}
                      label={<IntlMessages id="etablishments.info.siren" />}
                      margin="normal"
                      fullWidth
                      error={
                        this.isSIREN(this.state.siren) === false ? true : false
                      }
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      required
                      id="siret"
                      onChange={this.handleChange("siret")}
                      value={this.state.siret}
                      label={<IntlMessages id="etablishments.info.siret" />}
                      margin="normal"
                      fullWidth
                      error={
                        this.isSIRET(this.state.siret) === false ? true : false
                      }
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      required
                      id="tva"
                      onChange={this.handleChange("tva")}
                      value={this.state.tva}
                      label={<IntlMessages id="etablishments.info.tva" />}
                      margin="normal"
                      fullWidth
                      error={
                        parseInt(this.state.tva, 10) < 0 ||
                        parseInt(this.state.tva, 10) > 100
                      }
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      required
                      id="capital"
                      onChange={this.handleChange("capital")}
                      value={this.state.capital}
                      label={<IntlMessages id="etablishments.info.Capital" />}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                      <TextField
                         id="rib"
                        onChange={this.handleChange("rib")}
                        value={this.state.rib}
                        label={<IntlMessages id="etablishments.info.rib" />}
                        margin="normal"
                        fullWidth
                        // error={
                        //   parseInt(this.state.tva, 10) < 0 ||
                        //   parseInt(this.state.tva, 10) > 100
                        // }
                      />
                    </div>
                    <div className="col-sm-6">
                      <TextField
                         id="iban"
                        onChange={this.handleChange("iban")}
                        value={this.state.iban}
                        label={<IntlMessages id="etablishments.info.iban" />}
                        margin="normal"
                        fullWidth
                        // error={
                        //   parseInt(this.state.tva, 10) < 0 ||
                        //   parseInt(this.state.tva, 10) > 100
                        // }
                      />
                    </div>
                </div>
              )}

              <div className="col-sm-12">
                <br />
                <br />
                <h1>
                  {<IntlMessages id="component.etablishments.info.director" />}
                </h1>
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  id="surname_director"
                  name="surname_director"
                  label={
                    <IntlMessages id="components.establishments.formadd.surname_director" />
                  }
                  onChange={this.handleChange("surname_director")}
                  value={this.state.surname_director || ""}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  id="name_director"
                  name="name_director"
                  label={
                    <IntlMessages id="components.establishments.formadd.name_director" />
                  }
                  onChange={this.handleChange("name_director")}
                  value={this.state.name_director || ""}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  id="email_director"
                  name="email_director"
                  type="email"
                  label={
                    <IntlMessages id="components.establishments.formadd.email_director" />
                  }
                  onChange={this.handleChange("email_director")}
                  value={this.state.email_director || ""}
                  error={
                    this.isemail(this.state.email_director) === false
                      ? true
                      : false
                  }
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-sm-6">
                <TextField
                  required
                  id="phone_director"
                  name="phone_director"
                  label={
                    <IntlMessages id="components.establishments.formadd.phone_director" />
                  }
                  onChange={this.handleChange("phone_director")}
                  value={this.state.phone_director || ""}
                  error={
                    this.isPhonenumber(this.state.phone_director) === true ||
                    this.state.phone_director.length === 0
                      ? false
                      : true
                  }
                  type="number"
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-sm-12">
                <br />
                <br />
                <h1>
                  {<IntlMessages id="component.etablishments.info.categorie" />}
                </h1>
              </div>

              <div className="col-sm-6">
                <TextField
                  required
                  id="estab_type_id"
                  name="estab_type_id"
                  select
                  label={
                    <IntlMessages id="components.establishments.formadd.Categories" />
                  }
                  value={this.state.estab_type_id || ""}
                  onChange={this.handleChange("estab_type_id")}
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                >
                  {this.props.estabTypes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-12">
                <br />
                <br />
                <h1>
                  {
                    <IntlMessages id="component.etablishments.info.school.cuurent.years" />
                  }
                </h1>
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  id="currentYearId"
                  name="currentYearId"
                  select
                  label={<IntlMessages id="filter.school.years" />}
                  value={this.state.currentYearId || ""}
                  onChange={this.handleChange("currentYearId")}
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                >
                  {this.props.schoolYearList.map((year) => (
                    <MenuItem key={year.id} value={year.id}>
                      {year.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-12 pt-3">
                <InputLabel htmlFor="name-multiple">
                  {<IntlMessages id="components.establishments.formadd.logo" />}
                </InputLabel>{" "}
                <br /> <br />
                <label
                  htmlFor="files"
                  className="btn"
                  style={{
                    cursor: "pointer",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "#4C19A9",
                    borderRadius: "4rem",
                  }}
                >
                  <strong>
                    {
                      <IntlMessages id="components.establishments.formadd.selectImage" />
                    }
                  </strong>
                </label>{" "}
                <label htmlFor="files" className="btn">
                  {this.state.inputText}
                </label>
                <input
                  id="files"
                  type="file"
                  style={{ visibility: "hidden" }}
                  onChange={(e) => this.onDrop(e)}
                />
              </div>
              <div className="col-md-6 text-left ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  type="submit"
                >
                  {
                    <IntlMessages id="components.establishments.formModify.buttonModify" />
                  }
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.handleCancel}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
              <div className="col-md-6 text-right ">
                <br />
                <br />
                <Button
                  className="jr-btn bg-indigo text-white"
                  color="secondary"
                  onClick={this.handleDelete}
                >
                  {<IntlMessages id="button.delete" />}
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

export default connect()(EditEstablishment);
