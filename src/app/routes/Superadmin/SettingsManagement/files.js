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

export default class SettingsManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scolar_year: false,
    };
  }

  render() {
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

        <div className="d-flex flex-column justify-content-around align-items-center col-lg-12 col-md-12 col-sm-6 bg-danger ">
          <div className="col-lg-12 col-md-12 bg-green d-flex  justify-content-start align-items-center">
            <h2 style={{ fontSize: '20px', color: '#0B4786' }}>
              <b>Gestion des paramètres</b>
            </h2>
          </div>

          <div className="col-lg-12 col-md-12  ">
            <CardBox styleName="col-lg-12 ">
              <div className="col-lg-12 col-md-12   flex-column justify-content-around align-items-center">
                <div class="d-flex  flex-row justify-content-start bg-dark">
                  <div class="mr-3 col-lg-6 col-md-6 col-sm-12 d-flex  flex-column  justify-content-start  bg-yellow">
                    <TextField
                      required
                      select
                      id="type"
                      name="type"
                      label={'Pays'}
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
                        <b>Ajouter nouveau pays</b>
                      </p>
                      &nbsp;&nbsp;&nbsp;
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
                    <div className=" d-flex flex-row ">
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
                            <InputAdornment position="start">Fr</InputAdornment>
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
                            <InputAdornment position="start">Ar</InputAdornment>
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

                  <div>
                    <div class="col-md-11 col-sm-12 d-flex  flex-column  justify-content-start bg-green ">
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
                          // onClick={this.openAddModal}
                        >
                          <RemoveSharpIcon />
                          {/* {this.state.open ? <RemoveSharpIcon /> : <AddIcon />} */}
                        </Fab>
                      </div>
                      {this.state.scolar_year ? (
                        <TextField
                          className="mr-2"
                          id="type"
                          name="type"
                          label="year"
                          placeholder="YYYY-YYYY"
                          //value={this.state.type}
                          //onChange={this.handleChange('type')}
                          margin="normal"
                          fullWidth
                        ></TextField>
                      ) : (
                        ''
                      )}
                    </div>
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
                <div styleName="col-lg-12 col-md-12 bg-green d-flex align-items-center">
                  {' '}
                  {/* ++++++++++++++++++++CardBox partie 2++++++++++++ */}
                  <div class="d-flex flex-row bd-highlight mb-3">
                    <div class=" bd-highlight">
                      <div class=" col-md-9 d-flex  flex-column  justify-content-start  ">
                        <div className="col-md-12">
                          <TextField
                            required
                            select
                            id="type"
                            name="type"
                            label={'Pays'}
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
                            <b>Ajouter nouveau pays</b>
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
                    </div>
                    <div class="p-2 bd-highlight">Flex item 2</div>
                  </div>
                </div>
                <div styleName="col-lg-12 col-md-12 bg-yellow d-flex align-items-center">
                  {' '}
                  {/* <h1>++++++++++++++++++++CardBox partie 3++++++++++++</h1> */}
                </div>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-center col-lg-12 col-md-12 col-sm-6 bg-green ">
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
            onClick={this.handleSubmit}
          >
            <IntlMessages id="superadmin.apply.button" />
          </Button>
        </div>
      </div>
    );
  }
}
