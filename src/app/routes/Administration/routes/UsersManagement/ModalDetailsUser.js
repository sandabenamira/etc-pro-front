import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Auxiliary from '../../../../../util/Auxiliary';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { roleIdAdmin, roleIdProfessor, roleIdStudent, roleIdDirector, roleIdParent, roleIdSupervisor } from '../../../../../config/config';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../../../../assets/images/default-Avatar.png';
const listRolesUsers = [
  {
    id: roleIdAdmin,
    label: 'Administrateur',
    value: roleIdAdmin,
    labelBackEnd: 'Admin',
  },
  {
    id: roleIdDirector,
    label: 'Directeur Des Ressources Humaines',
    value: roleIdDirector,
    labelBackEnd: 'Director',
  },
  {
    id: roleIdSupervisor,
    label: 'Responsable formation',
    value: roleIdSupervisor,
    labelBackEnd: 'Vie scolaire',
  },
  {
    id: roleIdParent,
    label: "Chef d'agence",
    value: roleIdParent,
    labelBackEnd: 'Responsable formation',
  },
  {
    id: roleIdProfessor,
    label: 'Formateur',
    value: roleIdProfessor,
    labelBackEnd: 'Formateur',
  },
  {
    id: roleIdStudent,
    label: 'Collaborateur',
    value: roleIdStudent,
    labelBackEnd: 'Participant',
  },
];
export class ModalDetailsUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let userItem = this.props.userItem;
    let roleNameUser = '';
    let roleUser = listRolesUsers.find((element) => element.id == userItem.roleId);
    if (roleUser != undefined) {
      roleNameUser = roleUser.label;
    }
    console.log('userItem', userItem);
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
            <form className="d-flex flex-wrap col-md-12 col-lg-12 col-sm-12">
              <div className="d-flex flex-column flex-wrap col-md-12 col-lg-12 col-sm-12">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-3">
                  <label htmlFor="inforamtionsuser">
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
                      Informations générales
                    </Typography>
                  </label>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div className="col-md-4 col-lg-5 col-sm-12">
                      <label htmlFor="user.name">
                        {' '}
                        <IntlMessages id="user.name" />
                      </label>
                      <input disabled={true} type="text" className="form-control" id="user.name" value={userItem.name} />
                    </div>
                    <div className="col-md-4 col-lg-5 col-sm-12">
                      <label htmlFor="surname">
                        <IntlMessages id="user.last.name" />
                      </label>
                      <input disabled={true} className="form-control" id="surname" value={userItem.surname} />
                    </div>
                    <div className="col-md-4 col-lg-2 col-sm-12 d-flex justify-content-end ">
                      {userItem.urlPhoto == undefined ? (
                        <Avatar align="right" className="size-90" alt="..." src={defaultAvatar} />
                      ) : (
                        <Avatar align="right" className="size-90" alt="..." src={userItem.urlPhoto} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div className="col-md-6 col-lg-4 col-sm-12">
                      <label htmlFor="birthdayDate">
                        <IntlMessages id="user.birthday.date" />
                      </label>
                      <input disabled={true} className="form-control" id="birthdaydate" value={moment(userItem.dateOfBirth).format('YYYY-MM-DD')} />
                    </div>
                    <div className="col-md-6 col-lg-4 col-sm-12">
                      <label htmlFor="birthdayPlace">
                        <IntlMessages id="user.birthday.place" />
                      </label>
                      <input disabled={true} type="text" className="form-control" id="birthdayPlace" value={userItem.placeOfBirth} />
                    </div>
                    <div className="col-md-6 col-lg-4 col-sm-12">
                      <label htmlFor="nationality">
                        <IntlMessages id="user.nationality" />
                      </label>
                      <input disabled={true} type="text" className="form-control" id="nationality" value={userItem.nationality} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div className="col-md-6 col-lg-5 col-sm-12">
                      <label htmlFor="country">
                        <IntlMessages id="country.user" />
                      </label>
                      <input disabled={true} className="form-control" id="country" value={userItem.country} />
                    </div>
                    <div className="col-md-6 col-lg-4 col-sm-12">
                      <label htmlFor="zipeCode">
                        <IntlMessages id="zip.code.user" />
                      </label>
                      <input disabled={true} type="text" className="form-control" id="zipeCode" value={userItem.zipCode} />
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-12">
                      <label htmlFor="schoolYear">
                        <IntlMessages id="school.year.user" />
                      </label>
                      <input disabled={true} type="text" className="form-control" id="schoolYear" value={this.props.userProfile.school_year_name} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                    <div className="col-md-6 col-lg-6 col-sm-12">
                      <label htmlFor="email">
                        <IntlMessages id="user.mail" />
                      </label>
                      <input disabled={true} className="form-control" id="email" value={userItem.email} />
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12">
                      <label htmlFor="Phone">
                        <IntlMessages id="user.phone.number" />
                      </label>
                      <input disabled={true} type="text" className="form-control" id="Phone" value={userItem.phone} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-3">
                  <label htmlFor="inforamtionsuser">
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
                      Informations spécifiques &nbsp;{' '}
                    </Typography>
                  </label>
                </div>
                {this.props.userItem.roleId == roleIdProfessor ? (
                  <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center align-items-center">
                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div className="col-md-6 col-lg-3 col-sm-12">
                        <label htmlFor="identifier">
                          <IntlMessages id="user.id" />
                        </label>
                        <input disabled={true} className="form-control" id="identifier" value={userItem.uniqueIdentifier} />
                      </div>
                      <div className="col-md-6 col-lg-3 col-sm-12">
                        <label htmlFor="cin">
                          <IntlMessages id="user.cin" />
                        </label>
                        <input disabled={true} type="text" className="form-control" id="cin" value={userItem.cin} />
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="function">
                          <IntlMessages id="vie.scolaire.fonction" />
                        </label>
                        <input disabled={true} type="text" className="form-control" id="cin" value={roleNameUser} />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap mt-3">
                      <div className="col-md-6 col-lg-6 col-sm-12 d-flex flex-row ">
                        <div className="col-md-6 col-lg-6 col-sm-12 d-flex flex-column ">
                          <label htmlFor="professorClassRoom">Ces groupes</label>
                          {userItem.inforamtionsProf.map((element) => (
                            <span key={element.id} className="jr-tag bg-primary d-inline-block">
                              {element.classname}
                            </span>
                          ))}
                        </div>

                        <div className="col-md-6 col-lg-6 col-sm-12 d-flex flex-column">
                          <label htmlFor="professorClassRoom">Ces formations </label>
                          {userItem.inforamtionsProf.map((element) => (
                            <span key={element.id} className="jr-tag bg-primary d-inline-block">
                              {element.subjectName}
                            </span>
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
                    <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center align-items-center">
                      <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <label htmlFor="identifier">
                            <IntlMessages id="user.id" />
                          </label>
                          <input disabled={true} className="form-control" id="identifier" value={userItem.uniqueIdentifier} />
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <label htmlFor="cin">
                            <IntlMessages id="user.cin" />
                          </label>
                          <input disabled={true} type="text" className="form-control" id="cin" value={userItem.cin} />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <label htmlFor="function">
                            <IntlMessages id="vie.scolaire.fonction" />
                          </label>
                          <input disabled={true} type="text" className="form-control" id="function" value={roleNameUser} />
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <label htmlFor="function">Agence</label>
                          <input disabled={true} type="text" className="form-control" id="function" value={userItem.agencyName} />
                        </div>
                      </div>
                      {userItem.inforamtionsStudent.map((element) => (
                        <div className="col-md-6 col-lg-12 col-sm-12 d-flex flex-row p-2 ">
                          <div class="col-md-6 col-lg-4 col-sm-12 d-flex flex-column">
                            <label htmlFor="studentLevel">Niveau</label>
                            {element.levelName != null ? (
                              <span className="jr-tag bg-primary d-inline-block">{element.levelName}</span>
                            ) : (
                              <span className="jr-tag bg-primary d-inline-block">Non Affecté(e)</span>
                            )}
                          </div>
                          <div className="col-md-6 col-lg-4 col-sm-12 d-flex flex-column ">
                            <label htmlFor="studentClass">Classe de formation</label>
                            {element.classname != null ? (
                              <span className="jr-tag bg-primary d-inline-block">{element.classname}</span>
                            ) : (
                              <span className="jr-tag bg-primary d-inline-block">Non Affecté(e)</span>
                            )}
                          </div>

                          <div className="col-md-6 col-lg-4 col-sm-12 d-flex flex-column">
                            <label htmlFor="studentSection">Formation</label>
                            {element.sectionname != null ? (
                              <span className="jr-tag bg-primary d-inline-block">{element.sectionname}</span>
                            ) : (
                              <span className="jr-tag bg-primary d-inline-block">Non Affecté(e)</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                      <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                        <label htmlFor="inforamtionsuser">
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
                            Informations du chef d'agence &nbsp;{' '}
                          </Typography>
                        </label>
                      </div>
                      {userItem.parentId.map((element) => (
                        <>
                          <div className="col-md-12 col-lg-12 col-sm-12 p-2">
                            <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="nameParent">
                                  <IntlMessages id="user.name" />
                                </label>
                                <input disabled={true} className="form-control" id="nameParent" value={element.parentLastName} />
                              </div>
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="lastNameParent">
                                  <IntlMessages id="user.last.name" />
                                </label>
                                <input disabled={true} type="text" className="form-control" id="lastNameParent" value={element.parentName} />
                              </div>
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="mailParent">
                                  <IntlMessages id="user.mail" />
                                </label>
                                <input disabled={true} type="text" class="form-control" id="mailParent" value={element.parentMail} />
                              </div>
                            </div>
                            <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="phoneParent">
                                  <IntlMessages id="user.phone.number" />
                                </label>
                                <input disabled={true} className="form-control" id="phoneParent" value={element.parentPhone} />
                              </div>
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="parentZipCode">
                                  <IntlMessages id="zip.code.user" />
                                </label>
                                <input disabled={true} type="text" className="form-control" id="parentZipCode" value={element.parentZipCode} />
                              </div>
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="parentAddress">
                                  <IntlMessages id="user.address.postal" />
                                </label>
                                <input disabled={true} className="form-control" id="parentAddress" value={element.parentAddress} />
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
                    <div className="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                      <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                        <label htmlFor="inforamtionsuser">
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
                            Informations sur la personne à contacter en cas d'urgence &nbsp;{' '}
                          </Typography>
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-12 col-sm-12 p-2">
                        <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                          <div className="col-md-6 col-lg-4 col-sm-12">
                            <label htmlFor="name">
                              <IntlMessages id="user.name" />
                            </label>
                            <input
                              disabled={true}
                              className="form-control"
                              id="Tiercename"
                              // value={"identifier"}
                            />
                          </div>
                          <div className="col-md-6 col-lg-4 col-sm-12">
                            <label htmlFor="lastNameTiers">
                              <IntlMessages id="user.last.name" />
                            </label>
                            <input
                              disabled={true}
                              type="text"
                              className="form-control"
                              id="lastNameTiers"
                              // value={userItem.cin}
                            />
                          </div>
                          <div className="col-md-6 col-lg-4 col-sm-12">
                            <label htmlFor="phone">
                              <IntlMessages id="user.phone.number" />
                            </label>
                            <input
                              disabled={true}
                              type="text"
                              className="form-control"
                              id="Tiercephone"
                              // value={userItem.cin}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {this.props.userItem.roleId == roleIdParent ? (
                  <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="user.id">
                          <IntlMessages id="user.id" />
                        </label>
                        <input disabled={true} className="form-control" id="user.id" value={userItem.uniqueIdentifier} />
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="cin">
                          <IntlMessages id="user.cin" />
                        </label>
                        <input disabled={true} type="text" className="form-control" id="cin" value={userItem.cin} />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="function">
                          <IntlMessages id="vie.scolaire.fonction" />
                        </label>
                        <input disabled={true} type="text" className="form-control" id="function" value={roleNameUser} />
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="function">Agence</label>
                        <input disabled={true} type="text" className="form-control" id="function" value={userItem.agencyName} />
                      </div>
                    </div>
                    <div className="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                      <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                        <label htmlFor="inforamtionsuser">
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
                            Informations sur les collaborateurs &nbsp;{' '}
                          </Typography>
                        </label>
                      </div>
                      {userItem.inforamtionsParent.map((element, index) => (
                        <>
                          <div className="col-md-12 col-lg-12 col-sm-12 p-2" key={index}>
                            <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="nameParent">
                                  <IntlMessages id="user.name" />
                                </label>
                                <input disabled={true} className="form-control" id="nameParent" value={element.studentLastName} />
                              </div>
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="lastNameStudent">
                                  <IntlMessages id="user.last.name" />
                                </label>
                                <input disabled={true} type="text" className="form-control" id={element.studentId} value={element.studentName} />
                              </div>
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="studenName">
                                  <IntlMessages id="components.note.class" />
                                </label>
                                <input disabled={true} type="text" className="form-control" id="studentClassName" value={element.studentClassName} />
                              </div>
                            </div>
                            <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="mail">
                                  <IntlMessages id="user.mail" />
                                </label>
                                <input disabled={true} type="text" className="form-control" id="mail" value={element.studentMail} />
                              </div>
                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="phone">
                                  <IntlMessages id="user.phone.number" />
                                </label>
                                <input disabled={true} className="form-control" id="phone" value={element.studentPhone} />
                              </div>

                              <div className="col-md-6 col-lg-4 col-sm-12">
                                <label htmlFor="adressParent">
                                  <IntlMessages id="user.address.postal" />
                                </label>
                                <input disabled={true} className="form-control" id={element.studentId} value={element.studentAddress} />
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
                  <div className="col-md-12 col-lg-12 col-sm-12 justify-content-center">
                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="uniqueIdentifier">
                          <IntlMessages id="user.id" />
                        </label>
                        <input disabled={true} className="form-control" id="uniqueIdentifier" value={userItem.uniqueIdentifier} />
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="cin">
                          <IntlMessages id="user.cin" />
                        </label>
                        <input disabled={true} type="text" className="form-control" id="cin" value={userItem.cin} />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-row flex-wrap">
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="function">
                          <IntlMessages id="vie.scolaire.fonction" />
                        </label>
                        <input disabled={true} type="text" className="form-control" id="function" value={roleNameUser} />
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <label htmlFor="function">Banque</label>
                        <input disabled={true} type="text" className="form-control" id="function" value={this.props.establishments.name || ''} />
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                  <label htmlFor="inforamtionsuser">
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
                <div className="col-md-12 col-lg-12 col-sm-12 p-2">
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
              <div className="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                  <label htmlFor="inforamtionsuser">
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
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex  flex-row p-3">
                  {!_.isEmpty(userItem.paperFiles) &&
                    userItem.paperFiles.map((element, index) => {
                      return (
                        <div className="d-flex flex-column" key={index}>
                          <div className="p-2">
                            {' '}
                            <Button href={element} target="_blank">
                              <PictureAsPdfIcon
                                style={{
                                  fontSize: '35',
                                }}
                              />
                            </Button>
                          </div>
                          <div className="p-2">
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
                <div className="d-flex flex-column col-md-12 col-lg-12 col-sm-12">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-center p-2">
                    <label htmlFor="inforamtionsuser">
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
