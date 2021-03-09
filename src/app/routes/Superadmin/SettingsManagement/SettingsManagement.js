import React, { Component } from 'react';
import IntlMessages from '../../../../util/IntlMessages';
import CardBox from '../../../../components/CardBox/index';
import ChartCard from './GestionParametreCard';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import {addAdministration ,getCountries} from '../../../../actions/SuperadministrationAction'
 class SettingsManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scolar_year: false,
      country: 'Tunisie',
      open: false,
      opencountry: false,
      year: '',
      AR_country: "",
      FR_country: "",
      EN_country: ""
    };
    this.handleChange = this.handleChange.bind(this)
    this.openAddModalCountry = this.openAddModalCountry.bind(this)
    this.openAddModalScolar = this.openAddModalScolar.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleCancel=this.handleCancel.bind(this)


  }

  handleSubmit = () => {


     var data = {};
    // data.object = this.state.class_object;
    // data.class_id = this.state.class_id;
    // data.subject_id = this.state.subject_id;
    // data.class_url = this.state.class_url;
    // data.password = this.state.class_password;
    // data.date_virtual_class = this.state.class_date;
    // data.start_time_class = this.state.startTime;
    // data.end_time_class = this.state.endTime;
    // data.professor_id = this.state.professor_id;
    // data.status = true;
    // data.establishment_id = this.props.userProfile.establishment_id;
    // data.virtual_class_status = 'programée';

    data.name_fr_countrie=this.state.FR_country
    data.name_an_countrie=this.state.EN_country
    data.name_ar_countrie=this.state.AR_country
  this.props.addAdministration(data);

     this.setState({
      scolar_year: false,
      country: 'Tunisie',
      open: false,
      opencountry: false,
      year: '',
      AR_country: "",
      FR_country: "",
      EN_country: ""
    })

  };

  handleCancel = () => {
    this.setState({
      scolar_year: false,
      country: 'Tunisie',
      open: false,
      opencountry: false,
      year: '',
      AR_country: "",
      FR_country: "",
      EN_country: ""
    })
  };



  handleChange = (name) => (event) => {
     this.setState({ [name]: event.target.value });
  };

  openAddModalCountry() {
    if (this.state.opencountry === true) {
      this.setState({ opencountry: false });
    } else {
      this.setState({
        opencountry: true,
      });
    }
  }
  openAddModalScolar() {
    if (this.state.open === true) {
      this.setState({ open: false });
    } else {
      this.setState({
        open: true,
      });
    }
  }


  componentWillMount(){
    this.props.getCountries()
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="app-wrapper ">
        <div className="row col-lg-12 col-md-12">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <ChartCard
              chartProperties={{
                prize: 'Gestion des paramètres',
                icon: 'zmdi zmdi-settings',
                bgColor: 'primary',
                styleName: 'up',
              }}
              children={
                <ResponsiveContainer width="80%" height={75}>
                  <AreaChart
                    // data={increamentData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <Area
                      dataKey="pv"
                      strokeWidth={0}
                      stackId="2"
                      stroke="#273894"
                      fill="#273894"
                      fillOpacity={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              }
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <ChartCard
              chartProperties={{
                prize: 'Gestion des établissements',
                icon: 'zmdi zmdi-balance',
                bgColor: 'default',
                styleName: 'up',
              }}
              children={
                <ResponsiveContainer width="100%" height={75}>
                  <AreaChart
                    // data={increamentData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <Area
                      dataKey="pv"
                      type="monotone"
                      strokeWidth={0}
                      stackId="2"
                      stroke="#da2361"
                      fill="#da2361"
                      fillOpacity={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              }
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <ChartCard
              chartProperties={{
                prize: 'Reporting',
                icon: 'zmdi zmdi-equalizer',
                bgColor: 'default',
                styleName: 'down',
              }}
              children={
                <ResponsiveContainer width="100%" height={75}>
                  <AreaChart
                    //data={increamentData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <Area
                      dataKey="pv"
                      strokeWidth={0}
                      stackId="2"
                      stroke="#0c8e9f"
                      fill="#0c8e9f"
                      fillOpacity={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              }
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <ChartCard
              chartProperties={{
                prize: 'Gestion financiéres',
                icon: 'zmdi zmdi-money',
                bgColor: 'default',
                styleName: 'down',
              }}
              children={
                <ResponsiveContainer width="100%" height={75}>
                  <AreaChart
                    // data={increamentData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <Area
                      dataKey="pv"
                      strokeWidth={0}
                      stackId="2"
                      stroke="#3a983e"
                      fill="#3a983e"
                      fillOpacity={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              }
            />
          </div>
        </div>

        <div className="d-flex flex-column justify-content-around align-items-center col-lg-12 col-md-12 col-sm-6  ">
          <div className="col-lg-12 col-md-12  d-flex  justify-content-start align-items-center">
            <h2 style={{ fontSize: '20px', color: '#0B4786' }}>
              <b>Gestion des paramètres</b>
            </h2>
          </div>

          <div className="col-lg-12 col-md-12  ">
            <CardBox styleName="col-lg-12">
              <div className="col-lg-12 col-md-12  d-flex flex-column align-items-center">
                <div className="col-lg-12 col-md-12  d-flex flex-row align-items-center">
                  <div className="col-lg-6 col-md-6  d-flex flex-column align-items-center">
                    <TextField
                      required
                      select
                      id="country"
                      name="country"
                      label={'country'}
                      value={this.state.country}
                      onChange={this.handleChange('country')}
                      margin="normal"
                      fullWidth
                    >
                      {/* {currencies.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))} */}
                    </TextField>
                    <div className="d-flex justify-content-start align-items-center">
                      <p>
                        <b>Ajouter nouveau pays</b>
                      </p>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.openAddModalCountry}
                      >
                        {this.state.opencountry ? <RemoveSharpIcon /> : <AddIcon />}
                      </Fab>
                    </div>
                    {
                      this.state.opencountry ?

                        <div className=" d-flex flex-row ">
                          <TextField
                            className="mr-2"
                            id="FR_country"
                            name="FR_country"
                            value={this.state.FR_country}
                            onChange={this.handleChange('FR_country')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">Fr</InputAdornment>
                              ),
                            }}
                          ></TextField>
                          <TextField
                            className="mr-2"
                            id="AR_country"
                            name="AR_country"
                            value={this.state.AR_country}
                            onChange={this.handleChange('AR_country')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">Ar</InputAdornment>
                              ),
                            }}
                          ></TextField>
                          <TextField
                            id="EN_country"
                            name="EN_country"
                            value={this.state.EN_country}
                            onChange={this.handleChange('EN_country')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Eng
                            </InputAdornment>
                              ),
                            }}
                          ></TextField>
                        </div> : ""
                    }

                  </div>
                  <div className="col-lg-6 col-md-6  d-flex flex-column align-items-center">
                    <TextField
                      required
                      select
                      id="type"
                      name="type"
                      label={'année scolaire'}
                      //value={this.state.type}
                      //onChange={this.handleChange('type')}
                      margin="normal"
                      fullWidth
                    >
                      {/* {currencies.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))} */}
                    </TextField>

                    <div className="d-flex justify-content-start align-items-center">
                      <p>
                        <b>Ajouter nouvelle année scolaire</b>
                      </p>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.openAddModalScolar}
                      >

                        {this.state.open ? <RemoveSharpIcon /> : <AddIcon />}
                      </Fab>
                    </div>
                    {
                      this.state.open ?

                        <TextField
                          className="mr-2"
                          id="year"
                          name="year"
                          label="year"
                          placeholder="YYYY-YYYY"
                          value={this.state.year}
                          onChange={this.handleChange('year')}
                          margin="normal"
                          fullWidth
                        ></TextField> : ""
                    }

                  </div>
                </div>
                <hr
                  style={{
                    width: '100%',
                    margin: 'auto',
                    marginTop: '5%',
                    marginBottom: '5%',
                    border: '1px dashed #979A9A',
                    paddingLeft: '-100%',
                  }}
                />
                <div className="col-lg-12 col-md-12  d-flex align-items-center">
                  <div class="d-flex flex-row bd-highlight  justify-content-around mb-3">
                    <div class="p-2 w-100 bd-highlight ">
                      <div class=" col-md-9 d-flex  flex-column  justify-content-start  ">
                        <div className="col-md-12">
                          <TextField
                            required
                            select
                            id="type"
                            name="type"
                            label={'Systéme éducatif'}
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                          >
                            {/* {currencies.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))} */}
                          </TextField>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                          <p>
                            <b>Ajouter un nouveau systéme éducatif</b>
                          </p>
                          <Fab
                            size="small"
                            color="primary"
                            aria-label="Add"
                            // onClick={this.openAddModal}
                          >
                            <RemoveSharpIcon />
                            {/* {this.state.open ? <RemoveSharpIcon /> : <AddIcon />} */}
                          </Fab>
                        </div>
                        <div className=" d-flex flex-column ">
                          <TextField
                            id="type"
                            name="type"
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Fr
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                          <TextField
                            id="type"
                            name="type"
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Ar
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                          <TextField
                            id="type"
                            name="type"
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Eng
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                        </div>
                      </div>
                    </div>
                    <div class=" p-2 flex-shrink-1 bd-highlight ">
                      <div class=" col-md-12 d-flex  flex-column  justify-content-start  ">
                        <div className="col-md-12">
                          <TextField
                            select
                            id="type"
                            name="type"
                            label={'Type établissement'}
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                          >
                            {/* {currencies.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))} */}
                          </TextField>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                          <p>
                            <b>Ajouter un nouveau type d'établissement</b>
                          </p>
                          <Fab
                            size="small"
                            color="primary"
                            aria-label="Add"
                            // onClick={this.openAddModal}
                          >
                            <RemoveSharpIcon />
                            {/* {this.state.open ? <RemoveSharpIcon /> : <AddIcon />} */}
                          </Fab>
                        </div>
                        <div className=" d-flex flex-column ">
                          <TextField
                            className="mr-2"
                            id="type"
                            name="type"
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Fr
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                          <TextField
                            className="mr-2"
                            id="type"
                            name="type"
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Ar
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                          <TextField
                            id="type"
                            name="type"
                            //value={this.state.type}
                            //onChange={this.handleChange('type')}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Eng
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                        </div>
                      </div>
                    </div>{' '}
                  </div>
                </div>
                <hr
                  style={{
                    width: '100%',
                    margin: 'auto',
                    marginTop: '5%',
                    marginBottom: '5%',
                    border: '1px dashed #979A9A',
                    paddingLeft: '-100%',
                  }}
                />
                <div className="col-lg-12 col-md-12  d-flex align-items-center"></div>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-center col-lg-12 col-md-12 col-sm-6  ">
          <Button
            variant="contained"
            color="secondary"
            style={{
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              width: '15%',
              marginRight: '2%',
              backgroundColor: '#979A9A',
            }}
            className="  text-white "
            onClick={this.handleSubmit}
          >
            <IntlMessages id="components.establishments.formadd.buttonCancel" />
          </Button>
          <Button
            variant="contained"
            style={{
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              width: '15%',
            }}
            className=" bg-indigo text-white "
            onClick={this.handleCancel}
          >
            <IntlMessages id="superadmin.apply.button" />
          </Button>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
 listCountries:state.SuperadministrationReducer.remoteAdministration
  };
}

export default connect(
  mapStateToProps,
  {
    addAdministration,
    getCountries

  }
)(SettingsManagement);
