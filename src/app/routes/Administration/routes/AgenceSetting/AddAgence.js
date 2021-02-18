import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import CardBox from '../../../../../components/CardBox/index';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import MenuItem from '@material-ui/core/MenuItem';
import MuiPhoneNumber from 'material-ui-phone-number';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { isEmail } from '../../../../../constants/validationFunctions';
const fonctionList = [
  { label: "Siège social", id: 1, value: 1 },
  { label: 'Entreprises', id: 2, value: 2 },
  { label: 'Particuliers et Professionnels', id: 3, value: 3 },
  { label: 'Mixte', id: 4, value: 4 },
   
];
export default class AddAgence extends React.Component {w
  constructor(props) {
    super(props);
    this.state = {};
  }
  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }

    return res;
  };
  render() {
    return (
      <div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="add-service"
              yes={() => (
                <div>
                  <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                    <div className="d-flex justify-content-start align-items-center">
                      <h1>
                        <b>
                          <IntlMessages id="add.new.agence" />
                        </b>
                      </h1>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.props.openAddModal}
                      >
                        {this.props.values.open ? <RemoveSharpIcon /> : <AddIcon />}
                      </Fab>
                    </div>
                    <br />
                    {this.props.values.open ? (
                      <>
                        {' '}
                        <CardBox styleName=" text-black  ">
                          <div className="d-flex flex-column  ">
                            <div className="d-flex flex-wrap  align-items-center ">
                              <div className="col-md-4  col-lg-4 col-sm-4">
                                <TextField
                                  required
                                  id="Agence"
                                  label="Agence"
                                  value={this.props.values.nameAgence}
                                  onChange={this.props.handleChange('nameAgence')}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4  col-lg-4 col-sm-4">
                                <TextField
                                  id="typeAgence"
                                  label="Type Agence"
                                  value={this.props.values.typeAgence}
                                  onChange={this.props.handleChange('typeAgence')}
                                  margin="normal"
                                  fullWidth
                                  select
                                >
                                  {fonctionList.map((typeAgence) => (
                                    <MenuItem key={typeAgence.id} value={typeAgence.label}>
                                      {typeAgence.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="col-md-4  col-lg-4 col-sm-4">
                                <TextField
                                  required
                                  id="gouvernoratAgence"
                                  label="Gouvernorat"
                                  value={this.props.values.gouvernoratAgence}
                                  onChange={this.props.handleChange('gouvernoratAgence')}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4  col-lg-4 col-sm-4">
                                <TextField
                                  required
                                  id="adresseAgence"
                                  label="Adresse"
                                  value={this.props.values.adresseAgence}
                                  onChange={this.props.handleChange('adresseAgence')}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4  col-lg-4 col-sm-4">
                                <TextField
                                  error={
                                    isEmail(this.props.values.emailAgence) === false ? true : false
                                  }
                                  required
                                  id="emailAgence"
                                  label="Email"
                                  value={this.props.values.emailAgence}
                                  onChange={this.props.handleChange('emailAgence')}
                                  margin="normal"
                                  fullWidth
                                  helperText={
                                    isEmail(this.props.values.emailAgence) === false ? (
                                      <IntlMessages id="error.user.message.mail" />
                                    ) : (
                                      ''
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-4  col-lg-4 col-sm-4">
                                <MuiPhoneNumber
                                  error={
                                    this.isValidphoneNumber(this.props.values.faxAgence) === true ||
                                    this.props.values.faxAgence.length === 0
                                      ? false
                                      : true
                                  }
                                  id="faxAgence"
                                  name="faxAgence"
                                  value={this.props.values.faxAgence}
                                  onChange={this.props.handleChangeFax}
                                  fullWidth={true}
                                  label="Fax"
                                  placeholder="(+XXX) XXX XXX XXX"
                                  helperText={
                                    this.isValidphoneNumber(this.props.values.faxAgence) === true ||
                                    this.props.values.faxAgence.length === 0 ? (
                                      ''
                                    ) : (
                                      <IntlMessages id="error.user.message.phone" />
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-4  col-lg-4 col-sm-4">
                                <MuiPhoneNumber
                                  error={
                                    this.isValidphoneNumber(this.props.values.telAgence) === true ||
                                    this.props.values.telAgence.length === 0
                                      ? false
                                      : true
                                  }
                                  id="telAgence"
                                  name="telAgence"
                                  value={this.props.values.telAgence}
                                  onChange={this.props.handleChangePhone}
                                  fullWidth={true}
                                  label={<IntlMessages id="user.phone.number" />}
                                  placeholder="(+XXX) XXX XXX XXX"
                                  helperText={
                                    this.isValidphoneNumber(this.props.values.telAgence) === true ||
                                    this.props.values.telAgence.length === 0 ? (
                                      ''
                                    ) : (
                                      <IntlMessages id="error.user.message.phone" />
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </CardBox>
                        <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.openAddModal}
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '10%',
                              height: '20%',
                            }}
                          >
                            {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            className="bg-grey text-white "
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '10%',
                              height: '6%',
                            }}
                            onClick={this.props.handleArchive}
                          >
                            {<IntlMessages id="service.button.archive" />}
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            // disabled={
                            //   this.props.values.section_id == null ||
                            //   this.props.values.level_id == null ||
                            //   this.props.values.nameClassSettings == ''
                            //     ? true
                            //     : false
                            // }
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '10%',
                              height: '6%',
                            }}
                            className=" bg-indigo text-white "
                            type="submit"
                          >
                            <IntlMessages id="service.button.publish" />
                          </Button>
                        </div>{' '}
                      </>
                    ) : (
                      ''
                    )}
                  </form>
                </div>
              )}
            />
          )}
        </RoleContext.Consumer>
      </div>
    );
  }
}
