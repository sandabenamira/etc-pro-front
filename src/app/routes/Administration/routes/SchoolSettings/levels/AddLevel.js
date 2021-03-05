import React from 'react';
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
class AddLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.props.handleSubmit}>
          <div className="d-flex justify-content-start align-items-center">
            <h1>
              <b>
                <IntlMessages id="new.typeOfEducation" />
              </b>
            </h1>
            &nbsp;&nbsp;&nbsp;
            <Fab size="small" color="primary" aria-label="Add" onClick={this.props.openAddModal}>
              {this.state.open ? <RemoveSharpIcon /> : <AddIcon />}
            </Fab>
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
                      id="nameLevel"
                      error={this.state.nameError}
                      label={<IntlMessages id="stuppUser.formadd.name" />}
                      value={this.props.values.nameLevel}
                      onChange={this.props.handleChange('nameLevel')}
                      margin="normal"
                      fullWidth
                    />
                    <FormHelperText error={this.state.nameError}>{this.state.nameError ? 'Nom niveau déja existe' : ''}</FormHelperText>
                  </div>
                  <div className="col-md-6">
                    <TextField
                      required
                      id="educationTypeId"
                      name="educationTypeId"
                      onChange={this.props.handleChange('educationTypeId')}
                      select
                      label={<IntlMessages id="sidebar.components.typeOfEducation" />}
                      value={this.props.values.educationTypeId}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {this.props.educationTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
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
                  disabled={this.props.values.nameLevel == '' || this.props.values.level_id == 0 ? true : false}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    educationTypes: state.EstabTypes.educationTypes,
  };
};

export default connect(mapStateToProps)(AddLevel);
