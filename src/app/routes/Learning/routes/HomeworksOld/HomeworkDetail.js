
import React from 'react';
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from '../../../../../util/IntlMessages';
import Button from '@material-ui/core/Button';
import CardBox from "../../../../../components/CardBox/index";
import IconButton from '@material-ui/core/IconButton';
import ConversationCell from './ConversationCell';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import CustomScrollbars from '../../../../../util/CustomScrollbars';
import { getName } from "../../../../../actions/countriesAction";
import { addComment } from "../../../../../actions/ToDo";
import moment from 'moment'
import { connect } from "react-redux";
import { roleIdStudent, roleIdProfessor } from '../../../../../config/config';
import { getConversation, initListConversation, getAllDiscussionHomework } from '../../../../../actions/ToDo';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash'



class HomeworkDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      profile_professor_id: 0,
      profile_student_id: 0,
      file: null,
      inputText: '',
      todoConversation: []

    }
    this.handleCancel = this.handleCancel.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleChangeStudent = this.handleChangeStudent.bind(this);
  }

  handleChangeStudent = name => event => {
    if (event.target.value === "0") {
      this.props.dispatch(getAllDiscussionHomework(this.props.todo.id, this.props.userProfile.id))
    }else{
      this.props.dispatch(getConversation(this.props.todo.id, this.props.userProfile.id, event.target.value))
    }
    this.setState({ profile_student_id: event.target.value })
  }

  handleCancel() {
    this.props.dispatch(initListConversation())
    this.props.cancelModal();
  };
  onDrop = e => {
    let file = e.target.files[0]
    this.setState({ file: file, inputText: file.name });
  };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitComment();
    }
  };
  updateMessageValue(evt) {
    this.setState({
      message: evt.target.value
    });
  }
  componentDidMount() {

    const homeworId = this.props.todo.id;
    if (this.props.userProfile.role_id === roleIdStudent) {
      this.setState({ profile_student_id: this.props.userProfile.id })
      const profileStudentId = this.props.userProfile.id;
      const profileProfessorId = this.props.todo.professor.profile.id;
      this.props.dispatch(getConversation(homeworId, profileProfessorId, profileStudentId))
    } else if (this.props.userProfile.role_id === roleIdProfessor) {
      this.props.dispatch(getAllDiscussionHomework(homeworId,this.props.userProfile.id))

    }

  }


  submitComment() {

    if (this.state.message !== '' || this.state.file !== null) {
      let file = '';
      let file_name = '';
      if (this.state.file !== null) {
        const fileExtension = this.state.file.name.replace(/^.*\./, '');
        file = 'Homework_' + this.props.todo.id + '_Subject_' + this.props.todo.subject_id + '_Professor_' + this.props.todo.professor.profile_id + '_' + Math.random().toString(36).slice(2) + '.' + fileExtension
        file_name = this.state.file.name;
      }
      let data = {
        "profile_professor_id": this.props.todo.professor.profile_id,
        "profile_student_id": this.state.profile_student_id,
        "homework_id": this.props.todo.id,
        "comment": this.state.message,
        "profile_sender_id": this.props.userProfile.id,
        "file": file,
        "file_name": file_name,
      }
      this.props.dispatch(addComment(data, this.state.file, this.props.userProfile.establishment_id))
      this.setState({ message: '', inputText: '', file: null });
    }
  }

  render() {
    const { description, date_creation, correction_date, professor, subject, homeworkClass } = this.props.todo;
    let { message } = this.state;
    const { studentsList } = this.props;    
    let sortConversation = _.sortBy(this.props.todoConversation, 'id')    

    return (
      <Auxiliary>
        <Modal isOpen={this.props.open}>
          <ModalHeader className="modal-box-header bg-primary text-white"
            toggle={this.handleCancel}
          >
            {<IntlMessages id="toDo.details" />}
          </ModalHeader>
          <ModalBody>
            <CardBox styleName="col-lg-12 text-primary" heading={<IntlMessages id="details.homework" />} >
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="homework-details:visit"
                    yes={() => (
                      <div className=" text-dark">
                        <Can
                          role={role}
                          perform="homework-filter-prof-name:visit"
                          yes={() => (
                            <div className="row">
                              <div className="col-md-4"><b><IntlMessages id="toDo.professor" /> </b>: &nbsp; {professor.profile.user.name}&nbsp; {professor.profile.user.surname}</div>
                              <div className="col-md-4"> <b><IntlMessages id="components.note.subject" /></b>: &nbsp; {getName(subject)}</div>
                              <div className="col-md-4">  <b><IntlMessages id="toDo.creationDate" /></b>: &nbsp;{moment(date_creation).format('L')}<br /></div>
                              <br />
                            </div>
                          )}
                        />
                        <Can
                          role={role}
                          perform="homework-assign-classes:visit"
                          yes={() => (
                            <div>

                              {homeworkClass.map((element, index) => (
                                <div className="row" key={index}>
                                  <div className="col-md-4"><b><IntlMessages id="components.note.class" /></b>: &nbsp;{element.class.name}</div>
                                  <div className="col-md-8"><b><IntlMessages id="toDo.correctionDate" /></b>: &nbsp;{moment(element.correction_date).format('L')} <br /></div>
                                </div>
                              ))}
                            </div>
                          )}
                        />
                        <Can
                          role={role}
                          perform="homework-display-details:visit"
                          yes={() => (
                            <div>
                              <div className="row">
                                <div className="col-md-6"><b><IntlMessages id="toDo.professor" /> </b>: &nbsp; {professor.profile.user.name}&nbsp; {professor.profile.user.surname}</div>
                                <div className="col-md-6"> <b><IntlMessages id="components.note.subject" /></b>: &nbsp; {getName(subject)}</div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">  <b><IntlMessages id="toDo.creationDate" /></b>: &nbsp;{moment(date_creation).format('L')}<br /></div>
                                <div className="col-md-6"><b><IntlMessages id="toDo.correctionDate" /></b>: &nbsp;{moment(correction_date).format('L')} <br /></div>
                              </div>
                            </div>
                          )}
                        />


                        <br />
                        <div className="row">
                          <div className="col-md-12"> <b><IntlMessages id="toDo.details" /></b>: &nbsp;{description}<br /></div>
                        </div>

                      </div>
                    )}
                  />
                )}
              </RoleContext.Consumer>
            </CardBox>
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="homework-comment:visit"
                  yes={() => (
                    <CardBox styleName="col-lg-12 text-primary" heading={<IntlMessages id="dashboard.comments" />} >

                      <div className=" text-dark">
                        <CustomScrollbars className="module-list-scroll scrollbar"
                          style={{ height: 'calc(80vh - 325px)' }}>
                          <Can
                            role={role}
                            perform="homework-filter-student:visit"
                            yes={() => (
                              <div className="col-lg-6">
                                <TextField
                                  id="profile_student_id"
                                  name="profile_student_id"
                                  select
                                  value={this.state.profile_student_id}
                                  label={<IntlMessages id="sidebar.eleve" />}
                                  onChange={this.handleChangeStudent()}
                                  SelectProps={{}}
                                  margin="normal"
                                  fullWidth >
                                  <MenuItem key="0" value="0">
                                    <IntlMessages id="option.all.comments" />
                                  </MenuItem>
                                  {studentsList.map(student => (
                                    <MenuItem key={student.id} value={student.id}>
                                      {this.props.settings.languageId === 'tunisia'
                                        ? <h4>{student.user.surname_ar} {student.user.name_ar}</h4>
                                        : <h4>{student.user.name} {student.user.surname}</h4>}

                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            )}
                          />
                          
                          {sortConversation.map((conversation, index) =>
                            <ConversationCell key={index} conversation={conversation} language={this.props.settings.languageId} />
                          )}
                        </CustomScrollbars>
                        <div className="chat-main-footer todo-main-footer">
                          <div > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.inputText}</div>
                          <div className="d-flex flex-row align-items-center" style={{ maxHeight: 61 }}>
                            <div className="col" >
                              <div className="form-group">
                                <textarea className="border-0 form-control chat-textarea"
                                  id="required"
                                  onKeyUp={this._handleKeyPress.bind(this)}
                                  onChange={this.updateMessageValue.bind(this)}
                                  value={message}
                                  rows={2}
                                  placeholder="Envoyer un message"
                                />

                              </div>
                            </div>
                            <div className="chat-sent">
                              <Button className="attach-file jr-btn text-muted"  >
                                {this.state.file === null ?
                                  <label htmlFor="files" className="btn"  ><i className="zmdi zmdi-attachment mr-2 zmdi-hc-2x" /></label>
                                  : <label htmlFor="files" className="btn" style={{ cursor: "pointer", color: "white", fontWeight: "bold", backgroundColor: '#4B58B9', borderRadius: '4rem' }} ><i className="zmdi zmdi-attachment mr-2 zmdi-hc-2x" /></label>
                                }
                                <input id="files" type="file" style={{ visibility: "hidden", maxWidth: 8 }} onChange={(e) => this.onDrop(e)} accept="application/pdf" />
                              </Button>
                              <IconButton
                                onClick={this.submitComment.bind(this)}
                                aria-label="Send message">
                                <i className="zmdi  zmdi-mail-send" />
                              </IconButton>

                            </div>
                          </div>
                        </div>
                      </div>

                    </CardBox>
                  )}
                />
              )}
            </RoleContext.Consumer>
            <div className="col-md-12 text-left ">
              <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
            </div>
          </ModalBody>

        </Modal>
      </Auxiliary>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoConversation: state.toDo.todoConversation,
    settings: state.settings.locale,
  };
}
export default connect(mapStateToProps)(HomeworkDetail);