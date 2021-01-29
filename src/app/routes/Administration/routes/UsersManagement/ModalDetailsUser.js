import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Auxiliary from '../../../../../util/Auxiliary';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Row, Col } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from '../../../../../config/config';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../../../../assets/images/default-Avatar.png';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

export class ModalDetailsUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let userItem = this.props.userItem;
    console.log(userItem, 'userItemuserItemuserItemuserItemuserItemuserItem');
    let roleUser = this.props.listRole.find((element) => element.id == userItem.roleId);
    let roleLabel = roleUser != undefined ? roleUser.label : '';
    return (
      <Auxiliary>
        <Modal isOpen={this.props.openDetails}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            <IntlMessages id="user.details" />
            <IconButton className="text-white">
              <CloseIcon onClick={this.props.handleCancelDetails} />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: '2%', paddingRight: '2%' }}>
            <form class="d-flex flex-wrap col-md-12 col-lg-12 col-sm-12">
              <div class="d-flex flex-column flex-wrap col-md-12 col-lg-12 col-sm-12">
                <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-3">
                  <label for="inforamtionsuser">
                    <Typography
                      variant="h6"
                      style={{
                        color: '#3F51B5',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        marginTop: '10px',
                      }}
                    >
                      Informations générales sur {roleLabel}
                    </Typography>
                  </label>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div class="col-md-4 col-lg-5 col-sm-12">
                      <label for="user.name">
                        {' '}
                        <IntlMessages id="user.name" />
                      </label>
                      <input
                        disabled={true}
                        type="text"
                        class="form-control"
                        id="user.name"
                        value={userItem.name}
                      />
                    </div>
                    <div class="col-md-4 col-lg-5 col-sm-12">
                      <label for="surname">
                        <IntlMessages id="user.last.name" />
                      </label>
                      <input
                        disabled={true}
                        class="form-control"
                        id="surname"
                        value={userItem.surname}
                      />
                    </div>
                    <div class="col-md-4 col-lg-2 col-sm-12 d-flex justify-content-end ">
                      {userItem.urlPhoto == undefined ? (
                        <Avatar align="right" className="size-90" alt="..." src={defaultAvatar} />
                      ) : (
                        <Avatar
                          align="right"
                          className="size-90"
                          alt="..."
                          src={userItem.urlPhoto}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div class="col-md-6 col-lg-4 col-sm-12">
                      <label for="birthdayDate">
                        <IntlMessages id="user.birthday.date" />
                      </label>
                      <input
                        disabled={true}
                        class="form-control"
                        id="birthdaydate"
                        value={moment(userItem.dateOfBirth).format('YYYY-MM-DD')}
                      />
                    </div>
                    <div class="col-md-6 col-lg-4 col-sm-12">
                      <label for="birthdayPlace">
                        <IntlMessages id="user.birthday.place" />
                      </label>
                      <input
                        disabled={true}
                        type="text"
                        class="form-control"
                        id="birthdayPlace"
                        value={userItem.placeOfBirth}
                      />
                    </div>
                    <div class="col-md-6 col-lg-4 col-sm-12">
                      <label for="nationality">
                        <IntlMessages id="user.nationality" />
                      </label>
                      <input
                        disabled={true}
                        type="text"
                        class="form-control"
                        id="nationality"
                        value={userItem.nationality}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div class="col-md-6 col-lg-5 col-sm-12">
                      <label for="country">
                        <IntlMessages id="country.user" />
                      </label>
                      <input
                        disabled={true}
                        class="form-control"
                        id="country"
                        value={userItem.country}
                      />
                    </div>
                    <div class="col-md-6 col-lg-4 col-sm-12">
                      <label for="zipeCode">
                        <IntlMessages id="zip.code.user" />
                      </label>
                      <input
                        disabled={true}
                        type="text"
                        class="form-control"
                        id="zipeCode"
                        value={userItem.zipCode}
                      />
                    </div>
                    <div class="col-md-6 col-lg-3 col-sm-12">
                      <label for="schoolYear">
                        <IntlMessages id="school.year.user" />
                      </label>
                      <input
                        disabled={true}
                        type="text"
                        class="form-control"
                        id="schoolYear"
                        // value={userItem.schoolYearId}
                        value={this.props.userProfile.school_year_name}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div class="col-md-6 col-lg-6 col-sm-12">
                      <label for="email">
                        <IntlMessages id="user.mail" />
                      </label>
                      <input
                        disabled={true}
                        class="form-control"
                        id="email"
                        value={userItem.email}
                      />
                    </div>
                    <div class="col-md-6 col-lg-6 col-sm-12">
                      <label for="Phone">
                        <IntlMessages id="user.phone.number" />
                      </label>
                      <input
                        disabled={true}
                        type="text"
                        class="form-control"
                        id="Phone"
                        value={userItem.phone}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-3">
                  <label for="inforamtionsuser">
                    <Typography
                      variant="h6"
                      style={{
                        color: '#3F51B5',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        marginTop: '10px',
                      }}
                    >
                      {<IntlMessages id="user.specific.inforamtions" />} &nbsp;{' '}
                    </Typography>
                  </label>
                </div>
                {this.props.userItem.roleId == roleIdProfessor ? (
                  <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center align-items-center">
                    <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div class="col-md-6 col-lg-3 col-sm-12">
                        <label for="identifier">
                          <IntlMessages id="user.id" />
                        </label>
                        <input
                          disabled={true}
                          class="form-control"
                          id="identifier"
                          value={userItem.uniqueIdentifier}
                        />
                      </div>
                      <div class="col-md-6 col-lg-3 col-sm-12">
                        <label for="cin">
                          <IntlMessages id="user.cin" />
                        </label>
                        <input
                          disabled={true}
                          type="text"
                          class="form-control"
                          id="cin"
                          value={userItem.cin}
                        />
                      </div>
                      <div class="col-md-6 col-lg-6 col-sm-12 d-flex flex-row ">
                        <div class="col-md-6 col-lg-6 col-sm-12 d-flex flex-column ">
                          <label for="professorClassRoom">Groupes de formation</label>
                          {userItem.inforamtionsProf.map((element) => (
                            <>
                              <span
                                key={element.id}
                                className="jr-tag  bg-primary d-inline-block"
                              >
                                {element.calssName}
                              </span>
                            </>
                          ))}
                        </div>

                        <div class="col-md-6 col-lg-6 col-sm-12 d-flex flex-column">
                          <label for="professorClassRoom">Formations</label>
                          {userItem.inforamtionsProf.map((element) => (
                            <>
                              <span
                                key={element.id}
                                className="jr-tag  bg-primary d-inline-block"
                              >
                                {element.subjectName}
                              </span>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {this.props.userItem.roleId == roleIdStudent ? (
                  <>
                    <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center align-items-center">
                      <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                        <div class="col-md-6 col-lg-4 col-sm-12">
                          <label for="identifier">
                            <IntlMessages id="user.id" />
                          </label>
                          <input
                            disabled={true}
                            class="form-control"
                            id="identifier"
                            value={userItem.uniqueIdentifier}
                          />
                        </div>
                        <div class="col-md-6 col-lg-4 col-sm-12">
                          <label for="cin">
                            <IntlMessages id="user.cin" />
                          </label>
                          <input
                            disabled={true}
                            type="text"
                            class="form-control"
                            id="cin"
                            value={userItem.cin}
                          />
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-12 col-sm-12 d-flex flex-row p-2 ">
                        <div class="col-md-6 col-lg-4 col-sm-12 d-flex flex-column ">
                          <label for="studentClass">
                            <IntlMessages id="student.class" />
                          </label>

                          <span className="jr-tag   bg-primary d-inline-block">
                            {userItem.inforamtionsStudent.classInformation.classname}
                          </span>
                        </div>

                        <div class="col-md-6 col-lg-4 col-sm-12 d-flex flex-column">
                          <label for="studentLevel">
                            <IntlMessages id="student.level" />
                          </label>

                          <span className="jr-tag  bg-primary d-inline-block">
                            {userItem.inforamtionsStudent.classInformation.levelName}
                          </span>
                        </div>
                        <div class="col-md-6 col-lg-4 col-sm-12 d-flex flex-column">
                          <label for="studentSection">
                            <IntlMessages id="student.section" />
                          </label>

                          <span className="jr-tag  bg-primary d-inline-block">
                            {userItem.inforamtionsStudent.classInformation.sectionname}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                      <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                        <label for="inforamtionsuser">
                          <Typography
                            variant="h6"
                            style={{
                              color: '#3F51B5',
                              fontWeight: 'bold',
                              fontFamily: 'Roboto',
                              fontSize: '20px',
                              marginTop: '10px',
                            }}
                          >
                            {/* {<IntlMessages id="student.inforamtions.parent" />} &nbsp;{' '} */}
                            Informations sur le Responsable formation
                          </Typography>
                        </label>
                      </div>
                      {userItem.inforamtionsStudent.parentsInformation.map((element) => (
                        <>
                          <div class="col-md-12 col-lg-12 col-sm-12 p-2">
                            <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="nameParent">
                                  <IntlMessages id="user.name" />
                                </label>
                                <input
                                  disabled={true}
                                  class="form-control"
                                  id="nameParent"
                                  value={element.parentLastName}
                                />
                              </div>
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="lastNameParent">
                                  <IntlMessages id="user.last.name" />
                                </label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  id="lastNameParent"
                                  value={element.parentName}
                                />
                              </div>
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="mailParent">
                                  <IntlMessages id="user.mail" />
                                </label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  id="mailParent"
                                  value={element.parentMail}
                                />
                              </div>
                            </div>
                            <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="phoneParent">
                                  <IntlMessages id="user.phone.number" />
                                </label>
                                <input
                                  disabled={true}
                                  class="form-control"
                                  id="phoneParent"
                                  value={element.parentPhone}
                                />
                              </div>
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="parentZipCode">
                                  <IntlMessages id="zip.code.user" />
                                </label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  id="parentZipCode"
                                  value={element.parentZipCode}
                                />
                              </div>
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="parentAddress">
                                  <IntlMessages id="user.address.postal" />
                                </label>
                                <input
                                  disabled={true}
                                  class="form-control"
                                  id="parentAddress"
                                  value={element.parentAddress}
                                />
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
                        </>
                      ))}
                    </div>
                    {/* <div class="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                      <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                        <label for="inforamtionsuser">
                          <Typography
                            variant="h6"
                            style={{
                              color: '#3F51B5',
                              fontWeight: 'bold',
                              fontFamily: 'Roboto',
                              fontSize: '20px',
                              marginTop: '10px',
                            }}
                          >
                            {<IntlMessages id="student.inforamtions.tiers" />} &nbsp;{' '}
                          </Typography>
                        </label>
                      </div>
                      <div class="col-md-12 col-lg-12 col-sm-12 p-2">
                        <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                          <div class="col-md-6 col-lg-4 col-sm-12">
                            <label for="name">
                              <IntlMessages id="user.name" />
                            </label>
                            <input
                              disabled={true}
                              class="form-control"
                              id="Tiercename"
                              // value={"identifier"}
                            />
                          </div>
                          <div class="col-md-6 col-lg-4 col-sm-12">
                            <label for="lastNameTiers">
                              <IntlMessages id="user.last.name" />
                            </label>
                            <input
                              disabled={true}
                              type="text"
                              class="form-control"
                              id="lastNameTiers"
                              // value={userItem.cin}
                            />
                          </div>
                          <div class="col-md-6 col-lg-4 col-sm-12">
                            <label for="phone">
                              <IntlMessages id="user.phone.number" />
                            </label>
                            <input
                              disabled={true}
                              type="text"
                              class="form-control"
                              id="Tiercephone"
                              // value={userItem.cin}
                            />
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </>
                ) : (
                  ''
                )}
                {this.props.userItem.roleId == roleIdParent ? (
                  <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                    <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div class="col-md-6 col-lg-4 col-sm-12">
                        <label for="user.id">
                          <IntlMessages id="user.id" />
                        </label>
                        <input
                          disabled={true}
                          class="form-control"
                          id="user.id"
                          value={userItem.uniqueIdentifier}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 col-sm-12">
                        <label for="cin">
                          <IntlMessages id="user.cin" />
                        </label>
                        <input
                          disabled={true}
                          type="text"
                          class="form-control"
                          id="cin"
                          value={userItem.cin}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 col-sm-12">
                        <label for="function">
                          <IntlMessages id="vie.scolaire.fonction" />
                        </label>
                        <input
                          disabled={true}
                          type="text"
                          class="form-control"
                          id="function"
                          value={userItem.functionName}
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                      <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                        <label for="inforamtionsuser">
                          <Typography
                            variant="h6"
                            style={{
                              color: '#3F51B5',
                              fontWeight: 'bold',
                              fontFamily: 'Roboto',
                              fontSize: '20px',
                              marginTop: '10px',
                            }}
                          >
                            {/* {<IntlMessages id="parent.inforamtions.student" />} &nbsp;{' '} */}
                            Informations sur les Participants
                          </Typography>
                        </label>
                      </div>
                      {userItem.inforamtionsParent.map((element, index) => (
                        <>
                          <div class="col-md-12 col-lg-12 col-sm-12 p-2" key={index}>
                            <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="nameParent">
                                  <IntlMessages id="user.name" />
                                </label>
                                <input
                                  disabled={true}
                                  class="form-control"
                                  id="nameParent"
                                  value={element.studentLastName}
                                />
                              </div>
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="lastNameStudent">
                                  <IntlMessages id="user.last.name" />
                                </label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  id={element.studentId}
                                  value={element.studentName}
                                />
                              </div>
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="studentClassName">
                                  <IntlMessages id="components.note.class" />
                                </label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  id="studentClassName"
                                  value={element.studentClassName}
                                />
                              </div>
                            </div>
                            <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="mail">
                                  <IntlMessages id="user.mail" />
                                </label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  id="mail"
                                  value={element.studentMail}
                                />
                              </div>
                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="phone">
                                  <IntlMessages id="user.phone.number" />
                                </label>
                                <input
                                  disabled={true}
                                  class="form-control"
                                  id="phone"
                                  value={element.studentPhone}
                                />
                              </div>

                              <div class="col-md-6 col-lg-4 col-sm-12">
                                <label for="adressParent">
                                  <IntlMessages id="user.address.postal" />
                                </label>
                                <input
                                  disabled={true}
                                  class="form-control"
                                  id={element.studentId}
                                  value={element.studentAddress}
                                />
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
                        </>
                      ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {this.props.userItem.roleId == roleIdAdmin ||
                this.props.userItem.roleId == roleIdDirector ||
                this.props.userItem.roleId == roleIdSupervisor ? (
                  <div class="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                    <div class="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div class="col-md-6 col-lg-4 col-sm-12">
                        <label for="uniqueIdentifier">
                          <IntlMessages id="user.id" />
                        </label>
                        <input
                          disabled={true}
                          class="form-control"
                          id="uniqueIdentifier"
                          value={userItem.uniqueIdentifier}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 col-sm-12">
                        <label for="cin">
                          <IntlMessages id="user.cin" />
                        </label>
                        <input
                          disabled={true}
                          type="text"
                          class="form-control"
                          id="cin"
                          value={userItem.cin}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 col-sm-12">
                        <label for="function">
                          <IntlMessages id="vie.scolaire.fonction" />
                        </label>
                        <input
                          disabled={true}
                          type="text"
                          class="form-control"
                          id="function"
                          value={userItem.functionName}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div class="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                  <label for="inforamtionsuser">
                    <Typography
                      variant="h6"
                      style={{
                        color: '#3F51B5',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        marginTop: '10px',
                      }}
                    >
                      {<IntlMessages id="inforamtions.user" />} &nbsp;{' '}
                    </Typography>
                  </label>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 p-2">
                  <textarea
                    disabled={true}
                    className="container"
                    id="UsefulInformation"
                    name="UsefulInformation"
                    rows="3"
                    value={userItem.usefulInformation}
                    style={{
                      borderRadius: '20px',
                      marginTop: '10px',
                      width: '100%',
                    }}
                  ></textarea>
                </div>
              </div>
              <div class="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                  <label for="inforamtionsuser">
                    <Typography
                      variant="h6"
                      style={{
                        color: '#3F51B5',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        marginTop: '10px',
                      }}
                    >
                      {<IntlMessages id="user.adminstratif.papiers" />} &nbsp;{' '}
                    </Typography>
                  </label>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 d-flex  flex-row p-3">
                  {!_.isEmpty(userItem.paperFiles) &&
                    userItem.paperFiles.map((element, index) => {
                      return (
                        <div class="d-flex flex-column" key={index}>
                          <div class="p-2">
                            {' '}
                            <Button href={element} target="_blank">
                              <PictureAsPdfIcon
                                style={{
                                  fontSize: '35',
                                }}
                              />
                            </Button>
                          </div>
                          <div class="p-2">
                            {' '}
                            <Typography
                              variant="h6"
                              style={{
                                color: '#3F51B5',
                                fontWeight: 'normal',
                                fontFamily: 'Roboto',
                                fontSize: '10px',
                              }}
                            >
                              {element.slice(59)}
                            </Typography>
                            &nbsp;&nbsp;
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {userItem.roleId === roleIdProfessor || userItem.roleId === roleIdStudent ? (
                <div class="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                  <div class="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                    <label for="inforamtionsuser">
                      <Typography
                        variant="h6"
                        style={{
                          color: '#3F51B5',
                          fontWeight: 'bold',
                          fontFamily: 'Roboto',
                          fontSize: '20px',
                          marginTop: '10px',
                        }}
                      >
                        {<IntlMessages id="user.historique" />} &nbsp;{' '}
                      </Typography>
                    </label>
                  </div>
                </div>
              ) : (
                ''
              )}
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

export default ModalDetailsUser;
