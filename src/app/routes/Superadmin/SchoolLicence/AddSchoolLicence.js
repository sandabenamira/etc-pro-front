import React from 'react';
import IntlMessages from '../../../../util/IntlMessages';
import CardBox from '../../../../components/CardBox/index';
import Can from '../../../../can';
import { RoleContext } from '../../../../Context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
const paymentMode = [
  {
    value: 'Mensuel',
    label: <IntlMessages id="mode_payment.establishment.monthly" />,
  },
  {
    value: 'Trimestre',
    label: <IntlMessages id="mode_payment.establishment.trimester" />,
  },
  {
    value: 'Semestre',
    label: <IntlMessages id="mode_payment.establishment.semester" />,
  },
  {
    value: 'Annuel',
    label: <IntlMessages id="mode_payment.establishment.annual" />,
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
class AddSchoolLicence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    /* eslint eqeqeq: "off" */
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
                          <IntlMessages id="new.School.licence" />
                        </b>
                      </h1>
                      &nbsp;&nbsp;&nbsp;
                      <Fab size="small" color="primary" aria-label="Add" onClick={this.props.openAddModal}>
                        {this.state.isOpen ? <RemoveSharpIcon /> : <AddIcon />}
                      </Fab>
                    </div>
                    <br />
                    {this.props.values.isOpen ? (
                      <>
                        {' '}
                        <CardBox styleName=" text-black  ">
                          <div className="d-flex flex-column  ">
                            <div className="d-flex flex-wrap  align-items-center ">
                              <div className="col-md-4 ">
                                <TextField
                                  id="establishementId"
                                  name="establishementId"
                                  select
                                  required
                                  label={<IntlMessages id="establishement.choice" />}
                                  value={this.props.values.establishment}
                                  onChange={this.props.handleChange('establishementId')}
                                  SelectProps={{}}
                                  margin="normal"
                                  defaultValue=""
                                  fullWidth
                                >
                                  {this.props.establishmentsList.map((Item) => (
                                    <MenuItem key={Item.id} value={Item}>
                                      {Item.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="col-md-4  ">
                                <TextField
                                  id="schoolYearId"
                                  name="schoolYearId"
                                  select
                                  required
                                  label={<IntlMessages id="schoolYear.choice" />}
                                  value={this.props.values.schoolYearId}
                                  onChange={this.props.handleChangeSchoolYears('schoolYearId')}
                                  SelectProps={{}}
                                  margin="normal"
                                  defaultValue=""
                                  fullWidth
                                >
                                  {this.props.schoolYearList.map((Item) => (
                                    <MenuItem key={Item.id} value={Item.id}>
                                      {Item.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="col-md-4  ">
                                <TextField
                                  id="licenceType"
                                  name="licenceType"
                                  select
                                  required
                                  value={this.props.values.licenceType}
                                  onChange={this.props.handleChange('licenceType')}
                                  SelectProps={{}}
                                  label={<IntlMessages id="licence.status" />}
                                  margin="normal"
                                  fullWidth
                                >
                                  {this.props.values.licenceGroup.map((licence) => (
                                    <MenuItem key={licence.value} value={licence.value}>
                                      {licence.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="col-md-4">
                                <TextField
                                  required
                                  id="studentsNumber"
                                  onChange={this.props.handleChange('studentsNumber')}
                                  value={this.props.values.studentsNumber}
                                  label={<IntlMessages id="components.establishments.formadd.number_students" />}
                                  type="number"
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4">
                                <TextField
                                  required
                                  id="smsNumber"
                                  onChange={this.props.handleChange('smsNumber')}
                                  value={this.props.values.smsNumber}
                                  label={<IntlMessages id="components.establishments.formadd.number_sms" />}
                                  type="number"
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4">
                                <TextField
                                  required
                                  id="paymentMode"
                                  onChange={this.props.handleChange('paymentMode')}
                                  value={this.props.values.paymentMode}
                                  select
                                  label={<IntlMessages id="components.establishments.formadd.mode_payment" />}
                                  SelectProps={{}}
                                  margin="normal"
                                  fullWidth
                                >
                                  {paymentMode.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="col-sm-12">
                                <br />
                                <br />
                                <h1>{<IntlMessages id="sidebar.modules" />}</h1>
                              </div>
                              <div className="col-sm-6">
                                <FormControl className="w-100">
                                  <InputLabel htmlFor="name-multiple">{<IntlMessages id="sidebar.modules" />}</InputLabel>
                                  <Select
                                    multiple
                                    name="modules"
                                    value={this.props.values.modules}
                                    onChange={this.props.handleChangeModule}
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
                                    {this.props.moduleList.map((moduleEstablishment, index) => (
                                      <MenuItem key={moduleEstablishment.id} value={moduleEstablishment.id}>
                                        {moduleEstablishment.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="col-sm-6">
                                <div className="manage-margin d-flex flex-wrap">
                                  {this.props.values.modules.map((data, index) => {
                                    return (
                                      <Chip
                                        avatar={<Avatar src={require('../../../../assets/images/module.jpg')} />}
                                        label={this.props.moduleList.map((moduleEstablishment) => {
                                          if (moduleEstablishment.id === data) {
                                            return moduleEstablishment.name;
                                          } else {
                                            return null;
                                          }
                                        })}
                                        key={data.id}
                                      />
                                    );
                                  })}
                                </div>
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
                            {<IntlMessages id="level.button.archive" />}
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
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

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    establishmentsList: state.establishment.remoteEstablishments,
    schoolYearList: state.schoolYearEtab.remoteSchoolYearEtab,
  };
};

export default connect(mapStateToProps)(AddSchoolLicence);
