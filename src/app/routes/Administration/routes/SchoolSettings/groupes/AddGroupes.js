import React  from 'react';
import IntlMessages from '../../../../../../util/IntlMessages';
import CardBox from '../../../../../../components/CardBox/index';
import Can from '../../../../../../can';
import { RoleContext } from '../../../../../../Context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import { connect } from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class AddGroupes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {   /* eslint eqeqeq: "off" */
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
                    <div className="d-flex flex-wrap  flex-row bd-highlight mb-3 ">
                      <div className="p-3 d-flex justify-content-start align-items-center">
                        <Fab
                          size="small"
                          color="primary"
                          aria-label="Add"
                          onClick={this.props.openAddModal}
                        >
                          {this.state.open ? <RemoveSharpIcon /> : <AddIcon />}
                        </Fab>
                        &nbsp;&nbsp;&nbsp;
                        <h1>
                          <b>
                            <IntlMessages id="new.group" />
                          </b>
                        </h1>
                      </div>

                      <div className="p-3 d-flex justify-content-start align-items-center ">
                        <Fab size="small" color="secondary" aria-label="Add">
                          <DeleteOutlineIcon />
                        </Fab>
                        &nbsp;&nbsp;&nbsp;
                        <h1>
                          <b>
                            {' '}
                            <IntlMessages id="service.button.archive" />{' '}
                          </b>
                        </h1>{' '}
                      </div>
                    </div>

                    <br />
                    {this.props.values.open ? (
                      <>
                        {' '}
                        <CardBox styleName=" text-black  ">
                          <div className="row">
                            <div className="col-md-6">
                              <TextField
                                required
                                id="group"
                                name="group"
                                error={this.state.nameError}
                                label={<IntlMessages id="stuppUser.formadd.groupe" />}
                                value={this.props.values.group}
                                onChange={this.props.handleChange('group')}
                                margin="normal"
                                fullWidth
                              />
                              <FormHelperText error={this.state.nameError}>
                                {this.state.nameError ? 'Nom groupe déja existe' : ''}
                              </FormHelperText>
                            </div>
                            <div className="col-md-6">
                              <TextField
                              required
                                id="classId"
                                name="classId"
                                onChange={this.props.handleChange('classId')}
                                select
                                label={<IntlMessages id="sidebar.components.class" />}
                                value={
                                  this.props.values.classItem===''
                                    ? ''
                                    : JSON.stringify(this.props.values.classItem)
                                }
                                SelectProps={{}}
                                margin="normal"
                                fullWidth
                              >
                                {this.props.ClassSettings.map((type) => (
                                  <MenuItem key={type.id} value={JSON.stringify(type)}>
                                    {type.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          </div>
                        </CardBox>
                        <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.handleCancel}
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
                            disabled={
                              this.props.values.group==='' &&
                              this.props.values.classItem===''
                                ? true
                                : false
                            }
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
    ClassSettings: state.ClassSettingsReducer.classSettings,
  };
};

export default connect(mapStateToProps)(AddGroupes);
