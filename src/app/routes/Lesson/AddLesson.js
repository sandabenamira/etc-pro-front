import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from "../../../util/IntlMessages";
import Button from '@material-ui/core/Button';
import CardBox from "../../../components/CardBox/index";
import Auxiliary from "../../../util/Auxiliary";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
 import { RoleContext } from "../../../Context";
import Can from '../../../can';

class AddLesson extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    const {
      values,
      handleChange,
      handleChangeClass,
      addCourse,
      handleChangestudentLevel,
      handleChangestudentSection,
      handleChangeSubject,
      handleChangeProfessor,
      levels,
      subjects


    } = this.props;
    return (
      <Auxiliary>
        <Modal isOpen={this.props.open}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="course.modal.title" />}
          </ModalHeader>
          <br />
          <ModalBody>
            <form autoComplete="off">
              <div className="row">
                <CardBox
                  heading={
                    <IntlMessages id="component.etablishments.info.general" />
                  }
                  styleName="col-lg-12 text-primary"
                >
                  <RoleContext.Consumer>
                    {({ role }) => (
                      <div className="row">
                        <Can
                          role={role}
                          perform="formulaire-add-cour"
                          yes={() => (
                            <div className="col-md-4">
                              <div className="form-group">
                                <TextField
                                  id="level_id"
                                  name="level_id"
                                  select
                                  value={values.level_id}
                                  defaultValue=" "
                                  onChange={handleChangestudentLevel('level_id')}
                                  SelectProps={{}}
                                  helperText={
                                    <IntlMessages id="components.note.niveau" />
                                  }
                                  margin="normal"
                                  fullWidth
                                >
                                  {levels.map((level) => (
                                    <MenuItem key={level.id} value={level.id}>
                                      {level.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                          )}
                        />
                        <Can
                          role={role}
                          perform="formulaire-add-cour"
                          yes={() => (
                            <div className="col-md-4">
                              <div className="form-group">
                                <TextField
                                  id="section_id"
                                  name="section_id"
                                  select
                                  value={values.section_id}
                                  onChange={handleChangestudentSection('section_id')}
                                  disabled={values.Disable_studentsection}
                                  SelectProps={{}}
                                  helperText={
                                    <IntlMessages id="components.class.level.input.label.section" />
                                  }
                                  margin="normal"
                                  fullWidth
                                >
                                  {values.sections.map((section) => (
                                    <MenuItem key={section.id} value={section.id}>
                                      {section.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                          )}
                        />


                        <div className={values.divClassName}>
                          <div className="form-group">
                            <TextField
                              id="class_id"
                              name="class_id"
                              select
                              value={values.class_id}
                              onChange={handleChangeClass('class_id')}
                              SelectProps={{}}
                              helperText={<IntlMessages id="ticket.name.class" />}
                              margin="normal"
                              fullWidth
                            >
                              {values.studentClassesByLevelSectionID.map(
                                (classe) => (
                                  <MenuItem key={classe.id} value={classe.id}>
                                    {classe.name}
                                  </MenuItem>
                                )
                              )}
                            </TextField>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <TextField
                              id="subject_id"
                              name="subject_id"
                              select
                              value={values.subject_id}
                              onChange={handleChangeSubject('subject_id')}
                              SelectProps={{}}
                              helperText={
                                <IntlMessages id="components.note.subject" />
                              }
                              margin="normal"
                              fullWidth
                            >
                              {subjects.map((subject) => (
                                <MenuItem key={subject.id} value={subject.id}>
                                  {subject.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        </div>


                        <Can
                          role={role}
                          perform="formulaire-add-cour"
                          yes={() => (
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  id="professor_id"
                                  name="professor_id"
                                  select
                                  value={values.professor_id}
                                  onChange={handleChangeProfessor('professor_id')}
                                  SelectProps={{}}
                                  helperText={<IntlMessages id="toDo.professor" />}
                                  margin="normal"
                                  fullWidth
                                >
                                  {values.establishmentProfessor.map((option) => (
                                    <MenuItem
                                      key={option.professor.id}
                                      value={option.professor.id}
                                    >
                                      {option.professor.profile.user.name +
                                        ' ' +
                                        option.professor.profile.user.surname}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                          )}
                        />

                        <div className="col-md-6">
                          <div className="form-group">
                            <TextField
                              required
                              name="course_object"
                              id="course_object"
                              label={<IntlMessages id="subject.message" />}
                              onChange={handleChange('course_object')}
                              value={values.course_object}
                              margin="normal"
                              fullWidth
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <TextField
                              name="description"
                              id="description"
                              label={<IntlMessages id="room.description" />}
                              onChange={handleChange('description')}
                              value={values.description}
                              margin="normal"
                              fullWidth
                            />
                          </div>
                        </div>


                        <div className="col-md-6">
                          <div className="form-group">
                            <InputLabel htmlFor="name-multiple">
                              {<IntlMessages id="course.file.title" />}
                            </InputLabel>{' '}
                            <br />
                            <label
                              htmlFor="files"
                              className="btn"
                              style={{
                                cursor: 'pointer',
                                color: 'white',
                                fontWeight: 'bold',
                                backgroundColor: '#4C19A9',
                                borderRadius: '4rem'
                              }}
                            >
                              <strong>
                                {
                                  <IntlMessages id="course.file" />
                                }
                              </strong>
                            </label>{' '}
                            <label htmlFor="files" className="btn">

                              {values.inputText}
                            </label>
                            <input
                              id="files"
                              type="file"
                              style={{ visibility: 'hidden' }}
                              onChange={e => this.props.onDrop(e)}
                              accept="video/mp4,video/x-m4v,video/*,application/pdf,image/*"
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </RoleContext.Consumer>
                </CardBox>
              </div>
              <div className="col-md-12 text-left ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  onClick={addCourse}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonAdd" />
                  }
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.props.handleCancel}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
function mapStateToProps(state) {
  return {
   };
}

export default connect(mapStateToProps,
  {
 
  })(AddLesson);