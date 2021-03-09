import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { Card, CardBody, CardFooter, CardSubtitle } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { deleteFicheMedical } from '../../../actions/HealthAction';
import { getBlodType } from '../../../actions/HealthAction';
import DeleteHealthFile from './DeleteHealthFile';
import { connect } from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../config/config';
function TabContainer({ children, dir }) {
  return <div dir={dir}>{children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class HealthFileListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      url: '',
      establishmentName: '',
      deleteIsopen: false,
      editIsopen: false,
      student_Name: '',
      className: '',
    };
    this.cancelModal = this.cancelModal.bind(this);
    this.handleDeleteFicheMedical = this.handleDeleteFicheMedical.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
  }

  handleDeleteFicheMedical = () => {
    this.props.deleteFicheMedical(this.props.ficheMedicalItem.id);
    this.setState({ deleteIsopen: false });
  };
  cancelModal() {
    this.setState({ deleteIsopen: false });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleShowDeleteModal = () => {
    this.setState({ deleteIsopen: true });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  componentWillMount() {
    axios.get(`${baseUrl.baseUrl}/classes/` + this.props.ficheMedicalItem.class_id + `?access_token=${localStorage.token}`).then((res) => {
      this.setState({ className: res.data.name });
    });
    axios
      .get(
        `${baseUrl.baseUrl}/students/fetchAllStudentsDataByClassID/` + this.props.ficheMedicalItem.class_id + `?access_token=${localStorage.token}`
      )
      .then((res) => {
        var student = res.data.classData.find((element) => element.id === this.props.ficheMedicalItem.student_id);
        var studentName = student.profile.user.name + ' ' + student.profile.user.surname;
        this.setState({ student_Name: studentName });
      });
  }

  render() {   /* eslint eqeqeq: "off" */
    const { theme } = this.props;
    const data = [
      {
        id: 1,
        name: 'Des yeux',
      },
      {
        id: 2,
        name: 'Coeur',
      },
      {
        id: 3,
        name: 'CUTANÉ',
      },
      {
        id: 4,
        name: 'Système respiratoire',
      },
      {
        id: 5,
        name: 'Des oreilles',
      },
      {
        id: 6,
        name: 'Tension',
      },
      {
        id: 7,
        name: 'Système musculo-squelettique',
      },
      {
        id: 8,
        name: 'Système respiratoire',
      },
      {
        id: 9,
        name: 'Système nerveux',
      },
    ];
    var problems = data.filter((element) => this.props.ficheMedicalItem.problems.includes(element.id));
    return (
      <Card className="shadow border-0">
        <AppBar className="bg-primary card-header" position="static" style={{ paddingTop: 5, height: 55 }} className="">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
            className=" d-flex"
            style={{ paddingTop: '1%', height: 55 }}
          >
            <Tab
              className="tab  justify-content-start"
              label={
                <h6 style={{ color: '#fff' }}>
                  <b>Info élève</b>
                </h6>
              }
            />

            <Tab
              className="tab  justify-content-start"
              label={
                <h6 style={{ color: '#fff' }}>
                  <b>Médecin</b>
                </h6>
              }
            />

            <Tab
              className="tab  justify-content-start"
              label={
                <h6 style={{ color: '#fff' }}>
                  <b>Plus d'info</b>
                </h6>
              }
            />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
          <TabContainer dir={theme.direction}>
            <div className="d-flex align-items-center ">
              <CardBody>
                <div className=" d-flex flex-row justify-content-start">
                  <Avatar
                    align="left"
                    className="size-60 pb-2 pt-0"
                    alt="..."
                    src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png"
                  />
                  <div className="col-md-8   pt-3 ">
                    <p>
                      <CardSubtitle>
                        <b style={{ color: 'gray' }}> {this.state.student_Name}</b>
                      </CardSubtitle>
                      <CardSubtitle>
                        {' '}
                        <b style={{ color: 'gray' }}> {this.state.className}</b>{' '}
                      </CardSubtitle>
                    </p>
                  </div>
                </div>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Groupe sanguin :</b> {getBlodType(this.props.ficheMedicalItem.blood_type)}
                </CardSubtitle>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Poids :</b> {this.props.ficheMedicalItem.poids + ' KG'}
                </CardSubtitle>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Hauteur :</b> {this.props.ficheMedicalItem.hauteur + ' CM'}
                </CardSubtitle>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>J'ai un problème au niveau :</b> {problems.map((problem) => problem.name + ' ,')}
                </CardSubtitle>
              </CardBody>
            </div>
            <div className="d-flex align-items-end w-100 " style={{ paddingTop: '18%', marginRight: '0%' }}>
              <CardFooter className="d-flex align-items-center w-100 ">
                <CardSubtitle>
                  <b>Modifié :</b> 21/05/2020{' '}
                </CardSubtitle>
              </CardFooter>
            </div>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <div className="d-flex align-items-center  pt-5">
              <CardBody>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Nom :</b> {this.props.ficheMedicalItem.nom_doctor}
                </CardSubtitle>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Prénom :</b> {this.props.ficheMedicalItem.prenom_doctor}
                </CardSubtitle>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Télèphone :</b> {this.props.ficheMedicalItem.phone_doctor}
                </CardSubtitle>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Email :</b> {this.props.ficheMedicalItem.mail_doctor}
                </CardSubtitle>
              </CardBody>
            </div>
            <div className="d-flex align-items-end w-100 " style={{ paddingTop: '25%', marginRight: '0%' }}>
              <CardFooter className="d-flex align-items-center w-100 ">
                <CardSubtitle>
                  <b>Modifié :</b> 21/05/2020{' '}
                </CardSubtitle>
              </CardFooter>
            </div>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <div className="d-flex align-items-center  ">
              <CardBody>
                <CardSubtitle>
                  <b style={{ color: 'blue' }}>Remarque </b>{' '}
                </CardSubtitle>
                <CardSubtitle>
                  <p>{this.props.ficheMedicalItem.remarque}</p>
                  <CardSubtitle className="d-flex flex-column justify-content-around">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#009D88',
                        color: '#fff',
                        marginTop: '3%',
                      }}
                      startIcon={<CloudUploadIcon />}
                      href={this.props.ficheMedicalItem.files}
                      target="_blank"
                    >
                      Dossier médical
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      style={{ color: '#fff', marginTop: '3%' }}
                      startIcon={<CloudUploadIcon />}
                      onClick={(e) => {
                        this.setState({ menuState: false });
                        this.props.editFicheMedicalShowModal(this.props.ficheMedicalItem);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#FF4500',
                        color: '#fff',
                        marginTop: '3%',
                      }}
                      startIcon={<DeleteIcon />}
                      onClick={this.handleShowDeleteModal}
                    >
                      Supprimer
                    </Button>
                  </CardSubtitle>
                </CardSubtitle>
              </CardBody>
            </div>
            <div className="d-flex align-items-end w-100 " style={{ paddingTop: '15%', marginRight: '0%' }}>
              <CardFooter className="d-flex align-items-center w-100 ">
                <CardSubtitle>
                  <b>Modifié :</b> 21/05/2020{' '}
                </CardSubtitle>
              </CardFooter>
            </div>
          </TabContainer>
        </SwipeableViews>
        {this.state.deleteIsopen === true ? (
          <DeleteHealthFile
            deleteIsopen={this.state.deleteIsopen}
            handleDeleteFicheMedical={this.handleDeleteFicheMedical}
            cancelModal={this.cancelModal}
          />
        ) : (
          ''
        )}
      </Card>
    );
  }
}

HealthFileListItem.propTypes = {
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    classLevels: state.ClassLevels.remoteLevels,
    classSections: state.classSections.remoteSections,
    classes: state.classes,
    classVirtual: state.classVirtualReducer.remoteClassVirtual,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    settings: state.settings.locale,
    ficheMedicalList: state.HealthReducer.remoteFicheMedical,
  };
}

// export default withStyles(null, { withTheme: true })(HealthFileListItem);
export default connect(mapStateToProps, { deleteFicheMedical })(withStyles(null, { withTheme: true })(HealthFileListItem));
