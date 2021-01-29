
import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { saveEstablishments } from "../../../../../actions/establishmentAction";
import { connect } from 'react-redux';
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
//TODO mode payment est tjrs statique ?
const mode_payment = [
  {
    value: 'Semestre',
    label: <IntlMessages id="mode_payment.establishment.semester" />,
  },
  {
    value: 'Trimestre',
    label: <IntlMessages id="mode_payment.establishment.trimester" />,
  },
  {
    value: 'Mensuel',
    label: <IntlMessages id="mode_payment.establishment.monthly" />,
  },
  {
    value: 'Annuel',
    label: <IntlMessages id="mode_payment.establishment.annual" />,
  }

];

class AddEstablishment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      name: '',
       ar_disabled: true,
      address: '',
      code: '',
      city: '',
      country: 0,
      phone: '',
      email_establishment: '',
      website: '',
      surname_director: '',
      name_director: '',
      email_director: '',
      phone_director: '',
      categories: 0,
      modules: [],
      establishmentlogo: null,
      base64: '',
      establishmentPhotos: null,
      base64photo: '',
      matricule: '',
      tva: '',
      capital: '',
      siren: '',
      siret: '',
      currentYearId:null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  };

  handleChange = name => event => {

    if (name === "country") {

      if (event.target.value === 1) {
        this.setState({
          [name]: event.target.value, ar_disabled: false
        })
      }
      else {
        this.setState({
          [name]: event.target.value, ar_disabled: true
        });
      }
    }
    else {
      this.setState({
        [name]: event.target.value,
      });
    }
  };

  handleChangeModule = event => {
    this.setState({ modules: event.target.value });
  };
  handleCancel() {
    this.setState({
      previewVisible: false,
      name: '',
      ar_name: '',
      address: '',
      code: '',
      city: '',
      country: 0,
      phone: '',
      email_establishment: '',
      website: '',
      surname_director: '',
      name_director: '',
      email_director: '',
      phone_director: '',
      categories: 0,
      modules: [],
      matricule: '',
      tva: 0,
      capital: 0,
      siren: 0,
      siret: 0,
      currentYearId:null
    });
    this.props.cancelModal();
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.name;
    const ar_name = this.state.ar_name;
    const address = this.state.address;
    const code = this.state.code;
    const city = this.state.city;
    const countries_id = this.state.country;
    const phone = this.state.phone;
    const email_establishment = this.state.email_establishment;
    const website = this.state.website;
    const surname_director = this.state.surname_director;
    const name_director = this.state.name_director;
    const email_director = this.state.email_director;
    const phone_director = this.state.phone_director;
    const estab_type_id = this.state.categories;
    const module_id = this.state.modules;
    const logo = this.state.base64
    const matricule = this.state.matricule;
    const tva = parseInt(this.state.tva, 10);
    const capital = parseInt(this.state.capital, 10);
    const siren = parseInt(this.state.siren, 10);
    const siret = parseInt(this.state.siret, 10);
    const currentYearId = this.state.currentYearId;
    const data = {
      name, ar_name, address, code, city, countries_id, phone, email_establishment, website, surname_director, name_director, email_director, phone_director, estab_type_id, module_id, logo, matricule,
      tva, capital, siren, siret, currentYearId
    }
    this.props.saveEstablishments(data, this.state.establishmentPhotos);
    this.setState({
      previewVisible: false,
      name: '',
      ar_name: '',
      address: '',
      code: '',
      city: '',
      country: 0,
      phone: '',
      email_establishment: '',
      website: '',
      surname_director: '',
      name_director: '',
      email_director: '',
      phone_director: '',
      modules: [],
      establishmentlogo: null,
      base64: '',
      modal: false,
      pictures: [],
      file: null,
      fileList: null,
      establishmentPhotos: null,
      base64photo: '',
      matricule: '',
      tva: '',
      capital: '',
      siren: '',
      siret: '',
      currentYearId:null


    });
    this.props.cancelModal();
    this.onDrop = this.onDrop.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDrop = this.onDrop.bind(this);

  };

  /* Modal Control toggle */
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onDrop = e => {
    let file = e.target.files[0];
    this.setState({
      establishmentPhotos: file,
      inputText: file.name
    })


  };

  onTakePhoto(dataUri) {

    this.setState({
      image_uri: dataUri
    })
  }
  /*end Camera save Camera photo */

  isSIREN(cin) {
    if (cin.length > 0) return /^[0-9]\d{8}$/.test(cin);
    else return true;
  }
  isSIRET(cin) {
    if (cin.length > 0) return /^[0-9]\d{13}$/.test(cin);
    else return true;
  }


  render() {
    return (
      <div className="app-wrapper">
        <Auxiliary>
          <Modal isOpen={this.state.previewVisible} >
            <ModalHeader toggle={this.handleCancel} className="modal-box-header bg-primary text-white" >{<IntlMessages id="pages.establishementPage" />}</ModalHeader>
            <ModalBody>
              <form className="row" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="col-sm-12">
                  <h1>{<IntlMessages id="component.etablishments.info.general" />}</h1>
                </div>
                <div className="col-sm-2">
                  <TextField
                    required
                    variant="outlined"
                    id="country"
                    onChange={this.handleChange('country')}
                    select
                    label={<IntlMessages id="components.establishments.formadd.country" />}
                    value={this.state.country}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {this.props.countries.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="col-sm-5">
                  <TextField
                    required
                    variant="outlined"
                    name='name'
                    id="name"
                    label={<IntlMessages id="components.establishments.formadd.name" />}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    fullWidth
                    value={this.state.name}
                  />
                </div>
                <div className="col-sm-6">
                  <TextField
                    required
                    variant="outlined"
                    id="address"
                    name='address'
                    label={<IntlMessages id="components.establishments.formadd.adress" />}
                    onChange={this.handleChange('address')}
                    value={this.state.address}


                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-sm-6">
                  <TextField
                    required
                    variant="outlined"
                    id="code"
                    name="code"
                    type="number"
                    onChange={this.handleChange('code')}
                    value={this.state.code}
                    label={<IntlMessages id="components.establishments.formadd.codezip" />}
                    margin="normal"
                    fullWidth
                  />
                </div>

                <div className="col-sm-4">
                  <TextField
                    required
                    variant="outlined"
                    id="city"
                    onChange={this.handleChange('city')}
                    value={this.state.city}
                    label={<IntlMessages id="components.establishments.formadd.city" />}
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-sm-4">
                  <TextField
                    required
                    variant="outlined"
                    id="phone"
                    onChange={this.handleChange('phone')}
                    value={this.state.phone}
                    label={<IntlMessages id="components.establishments.formadd.phone" />}
                    type="number"
                    margin="normal"
                    fullWidth
                  />

                </div>
                <div className="col-sm-4">
                  <TextField
                    variant="outlined"
                    id="email_establishment"
                    variant="outlined"
                    type="email"
                    onChange={this.handleChange('email_establishment')}
                    value={this.state.email_establishment}
                    label={<IntlMessages id="components.establishments.formadd.email_establishment" />}
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-sm-4">
                  <TextField
                    variant="outlined"
                    id="website"
                    variant="outlined"
                    onChange={this.handleChange('website')}
                    value={this.state.website}
                    label={<IntlMessages id="components.establishments.formadd.website" />}
                    type="url"
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-sm-12">
                  <h1>{<IntlMessages id="etablishments.info.juri" />}</h1>
                </div>
                {




                  this.state.country === 1 ? <div className="row col-sm-12">
                    <div className="col-sm-4">
                      <TextField
                        required
                        variant="outlined"
                        id="matricule"
                        onChange={this.handleChange('matricule')}
                        value={this.state.matricule}
                        label={<IntlMessages id="etablishments.info.matricule" />}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    <div className="col-sm-4">
                      <TextField
                        required
                        variant="outlined"
                        id="tva"
                        onChange={this.handleChange('tva')}
                        value={this.state.tva}
                        label={<IntlMessages id="etablishments.info.tva" />}
                        margin="normal"
                        fullWidth
                        error={parseInt(this.state.tva, 10) < 0 || parseInt(this.state.tva, 10) > 100}

                      />
                    </div>
                    <div className="col-sm-4">
                      <TextField
                        required
                        variant="outlined"
                        id="capital"
                        onChange={this.handleChange('capital')}
                        value={this.state.capital}
                        label={<IntlMessages id="etablishments.info.Capital" />}
                        margin="normal"
                        fullWidth
                        error={parseInt(this.state.capital, 10) < 0}

                      />
                    </div>

                  </div> :


                    <div className="row col-sm-12">
                      <div className="col-sm-3">
                        <TextField
                          required
                          variant="outlined"
                          id="siren"
                          onChange={this.handleChange('siren')}
                          value={this.state.siren}
                          label={<IntlMessages id="etablishments.info.siren" />}
                          margin="normal"
                          fullWidth
                          error={this.isSIREN(this.state.siren) === false ? true : false}
                        />
                      </div>
                      <div className="col-sm-3">
                        <TextField
                          required
                          variant="outlined"
                          id="siret"
                          onChange={this.handleChange('siret')}
                          value={this.state.siret}
                          label={<IntlMessages id="etablishments.info.siret" />}
                          margin="normal"
                          fullWidth
                          error={this.isSIRET(this.state.siret) === false ? true : false}

                        />
                      </div>
                      <div className="col-sm-3">
                        <TextField
                          required
                          variant="outlined"
                          id="tva"
                          onChange={this.handleChange('tva')}
                          value={this.state.tva}
                          label={<IntlMessages id="etablishments.info.tva" />}
                          margin="normal"
                          fullWidth
                          error={parseInt(this.state.tva, 10) < 0 || parseInt(this.state.tva, 10) > 100}

                        />
                      </div>
                      <div className="col-sm-3">
                        <TextField
                          required
                          variant="outlined"
                          id="capital"
                          onChange={this.handleChange('capital')}
                          value={this.state.capital}
                          label={<IntlMessages id="etablishments.info.Capital" />}
                          margin="normal"
                          fullWidth
                          error={parseInt(this.state.capital, 10) < 0}

                        />
                      </div>
                    </div>

                }


                <div className="col-sm-12">
                  <br /><br />
                  <h1>{<IntlMessages id="component.etablishments.info.director" />}</h1>
                </div>
                <div className="col-sm-6">
                  <TextField
                    required
                    variant="outlined"
                    id="surname_director"
                    onChange={this.handleChange('surname_director')}
                    value={this.state.surname_director}
                    label={<IntlMessages id="components.establishments.formadd.surname_director" />}
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-sm-6">
                  <TextField
                    required
                    variant="outlined"
                    id="name_director"
                    onChange={this.handleChange('name_director')}
                    value={this.state.name_director}
                    label={<IntlMessages id="components.establishments.formadd.name_director" />}
                    margin="normal"
                    fullWidth
                  />
                </div>

                <div className="col-sm-6">
                  <TextField
                    variant="outlined"
                    id="email_director"
                    type="email"
                    onChange={this.handleChange('email_director')}
                    value={this.state.email_director}
                    label={<IntlMessages id="components.establishments.formadd.email_director" />}
                    margin="normal"
                    fullWidth
                  />
                </div>

                <div className="col-sm-6">
                  <TextField
                    required
                    variant="outlined"
                    id="phone_director"
                    onChange={this.handleChange('phone_director')}
                    value={this.state.phone_director}
                    label={<IntlMessages id="components.establishments.formadd.phone_director" />}
                    type="number"
                    margin="normal"
                    fullWidth
                  />
                </div>

                <div className="col-sm-12">
                  <br /><br />
                  <h1>{<IntlMessages id="component.etablishments.info.categorie" />}</h1>
                </div>

                <div className="col-sm-6">
                  <TextField
                    required
                    variant="outlined"
                    id="categories"
                    onChange={this.handleChange('categories')}
                    select
                    label={<IntlMessages id="components.establishments.formadd.Categories" />}
                    value={this.state.categories}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {this.props.estabTypes.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="col-sm-12">
                  <br /><br />
                  <h1>{<IntlMessages id="component.etablishments.info.school.years" />}</h1>
                </div>
                <div className="col-sm-6">
                  <TextField
                    required
                    variant="outlined"
                    id="currentYearId"
                    onChange={this.handleChange('currentYearId')}
                    value={this.state.currentYearId}
                    select
                    label={<IntlMessages id="filter.school.years" />}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {this.props.schoolYearList.map(year => (
                      <MenuItem key={year.id} value={year.id}>
                        {year.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div> 
                {/* <div className="col-sm-12">
                  <br /><br />
                  <h1>{<IntlMessages id="sidebar.modules" />}</h1>
                </div> */}
                {/* <div className="col-sm-6">
                  <FormControl className="w-100">
                    <InputLabel htmlFor="name-multiple">{<IntlMessages id="sidebar.modules" />}</InputLabel>
                    <Select
                      multiple
                      name="modules"
                      value={this.state.modules}
                      onChange={this.handleChangeModule}
                      input={<Input id="name-multiple" />}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 200,
                          },
                        },
                      }}
                    >
                      {
                        this.props.moduleList.map((moduleEstablishment, index) => (
                          <MenuItem
                            key={moduleEstablishment.id}
                            value={moduleEstablishment.id}
                          >
                            {moduleEstablishment.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div> */}
                {/* <div className="col-sm-6">
                  <div className="manage-margin d-flex flex-wrap">

                    {this.state.modules.map((data, index) => {
                      return (
                        <Chip
                          avatar={<Avatar
                            src={require('../../../../../assets/images/module.jpg')} />}
                          label={this.props.moduleList.map(moduleEstablishment => {
                            if (moduleEstablishment.id === data) {
                              return (
                                moduleEstablishment.name
                              );
                            } else { return null }
                          })}
                          key={data.id}
                        />
                      );
                    })}
                  </div>
                </div> */}
                <div className="col-sm-12 pt-3">

                  <InputLabel htmlFor="name-multiple">{<IntlMessages id="components.establishments.formadd.logo" />}</InputLabel> <br /> <br />
                  <label htmlFor="files" className="btn" style={{ cursor: "pointer", color: "white", fontWeight: "bold", backgroundColor: '#4C19A9', borderRadius: '4rem' }} ><strong>{<IntlMessages id="components.establishments.formadd.selectImage" />}</strong></label> <label htmlFor="files" className="btn">{this.state.inputText}</label>
                  <input id="files" type="file" style={{ visibility: "hidden" }} onChange={(e) => this.onDrop(e)} />

                </div>
                {/* <div className="col-sm-12 pt-3">
                  <h4><font color="red">*</font> {<IntlMessages id="component.required_fields" />}</h4>
                </div> */}
                <div className="col-md-12 text-left pt-3">
                  <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="components.establishments.formadd.buttonAdd" />}</Button>
                  <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </Auxiliary>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings.locale,
  };
}

export default connect(
  mapStateToProps,
  {
    saveEstablishments
  }
)(AddEstablishment);
