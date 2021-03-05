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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { GithubPicker } from 'react-color';
import InputLabel from '@material-ui/core/InputLabel';
export default class AddSubjectsSettings extends React.Component {
  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.props.handleSubmit}>
          <div className="d-flex justify-content-start align-items-center">
            <h1>
              <b>
                <IntlMessages id="add.new.subject" />
              </b>
            </h1>
            &nbsp;&nbsp;&nbsp;
            <Fab size="small" color="primary" aria-label="Add" onClick={this.props.openAddModal}>
              {this.props.values.isOpen ? <RemoveSharpIcon /> : <AddIcon />}
            </Fab>
          </div>
          <br />
          {this.props.values.isOpen ? (
            <>
              {' '}
              <CardBox styleName=" text-black  ">
                <div className="d-flex flex-column  ">
                  <div className="d-flex flex-wrap  align-items-center ">
                    <div className="col-md-6 ">
                      <TextField
                        required
                        id="nameSubject"
                        label={<IntlMessages id="components.exam.subject" />}
                        value={this.props.values.nameSubject}
                        onChange={this.props.handleChange('nameSubject')}
                        margin="normal"
                        fullWidth
                      />
                    </div>

                    <div className="col-md-6 ">
                      <TextField
                        id="wording"
                        rows={3}
                        label={<IntlMessages id="wording.subject" />}
                        value={this.props.values.wording}
                        onChange={this.props.handleChange('wording')}
                        margin="normal"
                        fullWidth
                      />
                    </div>

                    <div className="col-md-4 ">
                      <TextField
                        required
                        id="moduleSubjectId"
                        onChange={this.props.handleChange('moduleSubjectId')}
                        select
                        label={<IntlMessages id="sidebar.components.subjectModule" />}
                        value={this.props.values.moduleSubjectId}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth
                      >
                        {this.props.subjectModules.map((subjectModule) => (
                          <MenuItem key={subjectModule.id} value={subjectModule.id}>
                            {subjectModule.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <FormHelperText error={this.props.values.isError}>
                        {this.props.values.isError ? <IntlMessages id="message.error.subject.module" /> : ''}
                      </FormHelperText>
                    </div>

                    <div className="col-md-4  d-flex align-items-center pt-4 justify-content-end" style={{ height: '80px' }}>
                      <InputLabel htmlFor="name-multiple">{<IntlMessages id="choice.subject.color" />}</InputLabel>{' '}
                    </div>

                    <div className="col-md-4  d-flex align-items-start pt-4 justify-content-start " style={{ height: '80px' }}>
                      <GithubPicker onChangeComplete={this.props.handleColorChange} />
                    </div>
                  </div>
                </div>
              </CardBox>
              <div className="d-flex flex-wrap justify-content-end ">
                <Button
                  variant="contained"
                  onClick={this.openAddModal}
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
                  onClick={this.handleArchive}
                >
                  {<IntlMessages id="service.button.archive" />}
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
    );
  }
}
